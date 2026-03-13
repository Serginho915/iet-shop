from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ChatInitView,
    ChatMessagesView,
    ConsultationViewSet,
    CourseViewSet,
    EventViewSet,
    EventRequestViewSet,
    PostViewSet,
    TagViewSet,
    TestView,
)


router = DefaultRouter()
router.register("tags", TagViewSet, basename="tag")
router.register("courses", CourseViewSet, basename="course")
router.register("events", EventViewSet, basename="event")
router.register("posts", PostViewSet, basename="post")
router.register("consultations", ConsultationViewSet, basename="consultation")
router.register("event-requests", EventRequestViewSet, basename="event-request")


urlpatterns = [
    path('test/', TestView.as_view()),
    path('chat/init/', ChatInitView.as_view(), name='chat-init'),
    path('chat/messages/', ChatMessagesView.as_view(), name='chat-messages'),
]

urlpatterns += router.urls