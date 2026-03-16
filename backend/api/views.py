from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db.models import Exists, OuterRef
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import Throttled, ValidationError
from rest_framework.views import APIView

from .authentication import SessionCSRFAuthentication
from .chat_services import ChatRateLimitExceeded, create_message, get_or_create_chat_session
from .models import (
    ChatSession,
    Consultation,
    Course,
    CourseAudienceTagCard,
    CourseInstrument,
    CourseModule,
    CourseModuleDescription,
    CourseOutcome,
    Event,
    EventRequest,
    Message,
    Order,
    Post,
    Tag,
)
from .serializers import (
    AdminChatSessionSerializer,
    AdminConsultationSerializer,
    AdminCourseAudienceTagCardSerializer,
    AdminCourseInstrumentSerializer,
    AdminCourseModuleDescriptionSerializer,
    AdminCourseModuleSerializer,
    AdminCourseOutcomeSerializer,
    AdminCourseSerializer,
    AdminEventRequestSerializer,
    AdminEventSerializer,
    AdminMessageSerializer,
    AdminOrderSerializer,
    AdminPostSerializer,
    AdminTagSerializer,
    AdminUserSerializer,
    ChatMessageCreateSerializer,
    ChatMessageSerializer,
    ChatSessionSerializer,
    ConsultationSerializer,
    CourseSerializer,
    EventSerializer,
    EventRequestSerializer,
    PostSerializer,
    TagSerializer,
)


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_superuser)


class TestView(APIView):
    def get(self, request):
        return Response({"status": "ok"})


class ChatInitView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        chat_session = get_or_create_chat_session(request)
        get_token(request)
        serializer = ChatSessionSerializer(chat_session)
        return Response(serializer.data)


class ChatMessagesView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionCSRFAuthentication]

    def get(self, request):
        chat_session = get_or_create_chat_session(request)
        get_token(request)
        serializer = ChatMessageSerializer(chat_session.messages.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ChatMessageCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        chat_session = get_or_create_chat_session(request)

        try:
            message = create_message(
                chat_session=chat_session,
                text=serializer.validated_data['text'],
                sender_type=Message.SenderType.USER,
            )
        except ChatRateLimitExceeded as exc:
            raise Throttled(wait=exc.wait_seconds, detail=exc.detail) from exc
        except DjangoValidationError as exc:
            detail = exc.message_dict if hasattr(exc, 'message_dict') else exc.messages
            raise ValidationError(detail) from exc

        return Response(ChatMessageSerializer(message).data, status=status.HTTP_201_CREATED)


class AdminCSRFView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def get(self, request):
        return Response({'csrfToken': get_token(request)})


@method_decorator(csrf_protect, name='dispatch')
class AdminLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        username = str(request.data.get('username', '')).strip()
        password = str(request.data.get('password', ''))

        if not username or not password:
            return Response(
                {'detail': 'Username and password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_active:
            return Response({'detail': 'User account is inactive.'}, status=status.HTTP_403_FORBIDDEN)
        if not user.is_superuser:
            return Response(
                {'detail': 'Only superusers can access the admin panel.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        login(request, user)
        get_token(request)
        return Response({'user': AdminUserSerializer(user).data})


class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class AdminMeView(APIView):
    permission_classes = [IsSuperUser]

    def get(self, request):
        return Response({'user': AdminUserSerializer(request.user).data})


class AdminDashboardStatsView(APIView):
    permission_classes = [IsSuperUser]

    def get(self, request):
        return Response(
            {
                'tags': Tag.objects.count(),
                'courses': Course.objects.count(),
                'events': Event.objects.count(),
                'posts': Post.objects.count(),
                'consultations': Consultation.objects.count(),
                'event_requests': EventRequest.objects.count(),
                'orders': Order.objects.count(),
                'chat_sessions': ChatSession.objects.count(),
                'messages': Message.objects.count(),
            }
        )


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminOrReadOnly]


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().prefetch_related(
        "tags",
        "audience_tag_cards",
        "instrument_cards",
        "outcome_cards",
        "module_cards__description_rows",
    )
    serializer_class = CourseSerializer
    permission_classes = [IsAdminOrReadOnly]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().prefetch_related("tags")
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().prefetch_related("tags")
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_authenticators(self):
        # Public form submission should not depend on SessionAuth/CSRF.
        if self.request.method in ("POST", "OPTIONS"):
            return []
        return super().get_authenticators()

    def get_permissions(self):
        if self.request.method == "OPTIONS":
            return [permissions.AllowAny()]
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class EventRequestViewSet(viewsets.ModelViewSet):
    queryset = EventRequest.objects.all()
    serializer_class = EventRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_authenticators(self):
        # Public form submission should not depend on SessionAuth/CSRF.
        if self.request.method in ("POST", "OPTIONS"):
            return []
        return super().get_authenticators()

    def get_permissions(self):
        if self.request.method == "OPTIONS":
            return [permissions.AllowAny()]
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class AdminTagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('id')
    serializer_class = AdminTagSerializer
    permission_classes = [IsSuperUser]


class AdminCourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all().prefetch_related('tags').order_by('id')
    serializer_class = AdminCourseSerializer
    permission_classes = [IsSuperUser]


class AdminEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().prefetch_related('tags').order_by('id')
    serializer_class = AdminEventSerializer
    permission_classes = [IsSuperUser]


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().prefetch_related('tags').order_by('id')
    serializer_class = AdminPostSerializer
    permission_classes = [IsSuperUser]


class AdminConsultationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Consultation.objects.all().order_by('-created_at', '-id')
    serializer_class = AdminConsultationSerializer
    permission_classes = [IsSuperUser]


class AdminEventRequestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EventRequest.objects.all().order_by('-created_at', '-id')
    serializer_class = AdminEventRequestSerializer
    permission_classes = [IsSuperUser]


class AdminOrderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Order.objects.all().order_by('-id')
    serializer_class = AdminOrderSerializer
    permission_classes = [IsSuperUser]


class AdminCourseAudienceTagCardViewSet(viewsets.ModelViewSet):
    queryset = CourseAudienceTagCard.objects.all().select_related('course').order_by('course_id', 'order', 'id')
    serializer_class = AdminCourseAudienceTagCardSerializer
    permission_classes = [IsSuperUser]


class AdminCourseInstrumentViewSet(viewsets.ModelViewSet):
    queryset = CourseInstrument.objects.all().select_related('course').order_by('course_id', 'order', 'id')
    serializer_class = AdminCourseInstrumentSerializer
    permission_classes = [IsSuperUser]


class AdminCourseOutcomeViewSet(viewsets.ModelViewSet):
    queryset = CourseOutcome.objects.all().select_related('course').order_by('course_id', 'order', 'id')
    serializer_class = AdminCourseOutcomeSerializer
    permission_classes = [IsSuperUser]


class AdminCourseModuleViewSet(viewsets.ModelViewSet):
    queryset = CourseModule.objects.all().select_related('course').order_by('course_id', 'order', 'id')
    serializer_class = AdminCourseModuleSerializer
    permission_classes = [IsSuperUser]


class AdminCourseModuleDescriptionViewSet(viewsets.ModelViewSet):
    queryset = CourseModuleDescription.objects.all().select_related('module').order_by('module_id', 'order', 'id')
    serializer_class = AdminCourseModuleDescriptionSerializer
    permission_classes = [IsSuperUser]


class AdminChatSessionViewSet(viewsets.ModelViewSet):
    queryset = ChatSession.objects.all().order_by('-updated_at', '-created_at')
    serializer_class = AdminChatSessionSerializer
    permission_classes = [IsSuperUser]
    http_method_names = ['get', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        queryset = super().get_queryset()
        user_message_exists = Message.objects.filter(
            chat_session_id=OuterRef('pk'),
            sender_type=Message.SenderType.USER,
        )
        queryset = queryset.annotate(has_user_message=Exists(user_message_exists)).filter(has_user_message=True)
        is_active = self.request.query_params.get('is_active')
        if is_active is None:
            return queryset
        normalized = str(is_active).strip().lower()
        if normalized in {'true', '1', 'yes'}:
            return queryset.filter(is_active=True)
        if normalized in {'false', '0', 'no'}:
            return queryset.filter(is_active=False)
        return queryset


class AdminMessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.select_related('chat_session').all().order_by('created_at', 'id')
    serializer_class = AdminMessageSerializer
    permission_classes = [IsSuperUser]

    def get_queryset(self):
        queryset = super().get_queryset()
        chat_session_id = self.request.query_params.get('chat_session')
        sender_type = self.request.query_params.get('sender_type')

        if chat_session_id:
            queryset = queryset.filter(chat_session_id=chat_session_id)
        if sender_type:
            queryset = queryset.filter(sender_type=sender_type)
        return queryset
