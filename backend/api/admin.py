from django.contrib import admin
from .models import Consultation, Course, Event, Order, Post, Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
	search_fields = ("name",)


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
	list_display = ("title", "slug", "type", "price", "is_active", "start")
	list_filter = ("type", "is_active", "start")
	search_fields = ("title", "slug")
	readonly_fields = ("slug",)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
	list_display = ("id", "status", "total_amount", "created_at", "paid_at")
	list_filter = ("status", "created_at")
	search_fields = ("id",)
	readonly_fields = (
		"status",
		"total_amount",
		"stripe_payment_intent_id",
		"stripe_checkout_session_id",
		"created_at",
		"paid_at",
	)

	def has_add_permission(self, request):
		return False

	def has_change_permission(self, request, obj=None):
		return False

	def has_delete_permission(self, request, obj=None):
		return False

	def has_view_permission(self, request, obj=None):
		return request.user.is_active and request.user.is_staff


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	list_display = ("title", "date", "type")
	list_filter = ("type", "date")
	search_fields = ("title",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	list_display = ("title", "slug", "author", "created_at")
	list_filter = ("created_at",)
	search_fields = ("title", "author")
	readonly_fields = ("slug",)


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
	list_display = ("name", "email", "phone", "interested")
	search_fields = ("name", "email", "phone")

	def has_add_permission(self, request):
		return False

	def has_change_permission(self, request, obj=None):
		return False

	def has_delete_permission(self, request, obj=None):
		return False

	def has_view_permission(self, request, obj=None):
		return request.user.is_active and request.user.is_staff
