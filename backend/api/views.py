from django.core.exceptions import ValidationError as DjangoValidationError
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework import permissions, status, viewsets
from rest_framework.exceptions import Throttled, ValidationError
from rest_framework.views import APIView

from .authentication import SessionCSRFAuthentication
from .chat_services import ChatRateLimitExceeded, create_message, get_or_create_chat_session
from .models import Consultation, Course, Event, EventRequest, Message, Post, Tag
from .serializers import (
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
        return request.user and request.user.is_staff


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
