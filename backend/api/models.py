from uuid import uuid4

from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    name_en = models.CharField(max_length=100, null=True, blank=True)
    name_bg = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name_en or self.name_bg or f"Tag #{self.pk}"


class Course(models.Model):
    class CourseType(models.TextChoices):
        HYBRID = "hybrid", "Hybrid"
        ONLINE = "online", "Online"
        OFFLINE = "offline", "Offline"

    class AudienceType(models.TextChoices):
        ADULTS = "adults", "Adults"
        KIDS = "kids", "Kids"

    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)
    title_en = models.CharField(max_length=255, null=True, blank=True)
    title_bg = models.CharField(max_length=255, null=True, blank=True)
    start = models.DateField()
    image = models.ImageField(upload_to="courses/", null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    description_bg = models.TextField(null=True, blank=True)
    duration_en = models.CharField(max_length=100, null=True, blank=True)
    duration_bg = models.CharField(max_length=100, null=True, blank=True)
    type = models.CharField(max_length=10, choices=CourseType.choices)
    audience = models.CharField(max_length=10, choices=AudienceType.choices, null=True, blank=True)
    price = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    stripe_product_id = models.BigIntegerField(null=True, blank=True)
    stripe_price_id = models.BigIntegerField(null=True, blank=True)
    tags = models.ManyToManyField(Tag, related_name="courses", blank=True)
    about_title_en = models.CharField(max_length=255, null=True, blank=True)
    about_title_bg = models.CharField(max_length=255, null=True, blank=True)
    about_description_top_en = models.TextField(null=True, blank=True)
    about_description_top_bg = models.TextField(null=True, blank=True)
    about_description_bottom_en = models.TextField(null=True, blank=True)
    about_description_bottom_bg = models.TextField(null=True, blank=True)
    about_image = models.ImageField(upload_to="courses/about/", null=True, blank=True)
    audience_image = models.ImageField(upload_to="courses/audience/", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            title_for_slug = self.title_en or self.title_bg or "course"
            base_slug = slugify(title_for_slug)[:240] or "course"
            candidate = base_slug
            while Course.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{uuid4().hex[:8]}"
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en or self.title_bg or f"Course #{self.pk}"


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

    title_en = models.CharField(max_length=255, null=True, blank=True)
    title_bg = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to="events/", null=True, blank=True)
    description_en = models.TextField(null=True, blank=True)
    description_bg = models.TextField(null=True, blank=True)
    date = models.DateField()
    type = models.CharField(max_length=10, choices=EventType.choices)
    tags = models.ManyToManyField(Tag, related_name="events", blank=True)

    def __str__(self):
        return self.title_en or self.title_bg or f"Event #{self.pk}"


class Post(models.Model):
    slug = models.SlugField(max_length=255, unique=True, blank=True, editable=False)
    title_en = models.CharField(max_length=255, null=True, blank=True)
    title_bg = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=255)
    content_en = models.TextField(null=True, blank=True)
    content_bg = models.TextField(null=True, blank=True)
    picture = models.ImageField(upload_to="posts/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, related_name="posts", blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            title_for_slug = self.title_en or self.title_bg or "post"
            base_slug = slugify(title_for_slug)[:240] or "post"
            candidate = base_slug
            while Post.objects.filter(slug=candidate).exclude(pk=self.pk).exists():
                candidate = f"{base_slug}-{uuid4().hex[:8]}"
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title_en or self.title_bg or f"Post #{self.pk}"


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


class EventRequest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    interested = models.ForeignKey(
        Event,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="event_requests",
    )

    def __str__(self):
        return self.name


class CourseAudienceTagCard(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="audience_tag_cards",
    )
    order = models.PositiveSmallIntegerField(default=1)
    title_en = models.CharField(max_length=255, null=True, blank=True)
    title_bg = models.CharField(max_length=255, null=True, blank=True)
    text_en = models.TextField(null=True, blank=True)
    text_bg = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title_en or self.title_bg or f"Audience card #{self.pk}"


class CourseInstrument(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="instrument_cards",
    )
    order = models.PositiveSmallIntegerField(default=1)
    name_en = models.CharField(max_length=255, null=True, blank=True)
    name_bg = models.CharField(max_length=255, null=True, blank=True)
    icon = models.ImageField(upload_to="courses/instruments/", null=True, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name_en or self.name_bg or f"Instrument #{self.pk}"


class CourseOutcome(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="outcome_cards",
    )
    order = models.PositiveSmallIntegerField(default=1)
    text_en = models.TextField(null=True, blank=True)
    text_bg = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text_en or self.text_bg or f"Outcome #{self.pk}"


class CourseModule(models.Model):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="module_cards",
    )
    order = models.PositiveSmallIntegerField(default=1)
    title_en = models.CharField(max_length=255, null=True, blank=True)
    title_bg = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title_en or self.title_bg or f"Module #{self.pk}"


class CourseModuleDescription(models.Model):
    module = models.ForeignKey(
        CourseModule,
        on_delete=models.CASCADE,
        related_name="description_rows",
    )
    order = models.PositiveSmallIntegerField(default=1)
    text_en = models.CharField(max_length=255, null=True, blank=True)
    text_bg = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text_en or self.text_bg or f"Module tag #{self.pk}"
