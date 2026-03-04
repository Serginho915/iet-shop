from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    ConsultationViewSet,
    CourseViewSet,
    EventViewSet,
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


urlpatterns = [
    path('test/', TestView.as_view()),
]

urlpatterns += router.urls