from django.db import models
from django.utils.text import slugify
from uuid import uuid4


class Tag(models.Model):
	name = models.CharField(max_length=100, unique=True)

	def __str__(self):
		return self.name


class Course(models.Model):
	class CourseType(models.TextChoices):
		HYBRID = "hybrid", "Hybrid"
		ONLINE = "online", "Online"
		OFFLINE = "offline", "Offline"

	slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)
	title = models.CharField(max_length=255)
	start = models.DateField()
	image = models.ImageField(upload_to="courses/")
	description = models.TextField()
	duration = models.CharField(max_length=100)
	type = models.CharField(max_length=10, choices=CourseType.choices)
	price = models.PositiveIntegerField()
	is_active = models.BooleanField(default=True)
	stripe_product_id = models.BigIntegerField(null=True, blank=True)
	stripe_price_id = models.BigIntegerField(null=True, blank=True)
	tags = models.ManyToManyField(Tag, related_name="courses", blank=True)

	def save(self, *args, **kwargs):
		if not self.slug:
			base_slug = slugify(self.title)[:240] or "course"
			candidate = base_slug
			while Course.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
				candidate = f"{base_slug}-{uuid4().hex[:8]}"
			self.slug = candidate
		super().save(*args, **kwargs)

	def __str__(self):
		return self.title


class Order(models.Model):
	status = models.BooleanField(default=False)
	total_amount = models.PositiveIntegerField()
	stripe_payment_intent_id = models.BigIntegerField(null=True, blank=True)
	stripe_checkout_session_id = models.BigIntegerField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	paid_at = models.DateTimeField(null=True, blank=True)

	def __str__(self):
		return f"Order #{self.pk}"


class Event(models.Model):
	class EventType(models.TextChoices):
		ONLINE = "online", "Online"
		OFFLINE = "offline", "Offline"
		HYBRID = "hybrid", "Hybrid"

	title = models.CharField(max_length=255)
	date = models.DateField()
	type = models.CharField(max_length=10, choices=EventType.choices)
	tags = models.ManyToManyField(Tag, related_name="events", blank=True)

	def __str__(self):
		return self.title


class Post(models.Model):
  slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)
  title = models.CharField(max_length=255)
	author = models.CharField(max_length=255)
	content = models.TextField()
	picture = models.ImageField(upload_to="posts/")
	created_at = models.DateTimeField(auto_now_add=True)
	tags = models.ManyToManyField(Tag, related_name="posts", blank=True)

	def __str__(self):
		return self.title


class Consultation(models.Model):
	name = models.CharField(max_length=255)
	email = models.EmailField()
	phone = models.CharField(max_length=30)
	interested = models.ForeignKey(
		Course,
		on_delete=models.SET_NULL,
		null=True,
		blank=True,
		related_name="consultations",
	)

	def __str__(self):
		return self.name
