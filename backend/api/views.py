from rest_framework.response import Response
from rest_framework import permissions, viewsets
from rest_framework.views import APIView

from .models import Consultation, Course, Event, EventRequest, Post, Tag
from .serializers import (
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

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class EventRequestViewSet(viewsets.ModelViewSet):
    queryset = EventRequest.objects.all()
    serializer_class = EventRequestSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
