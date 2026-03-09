from rest_framework import serializers

from .models import (
    Consultation,
    Course,
    Event,
    Post,
    Tag,
)


class BilingualSerializerMixin:
    def _file_url(self, file_field):
        if not file_field:
            return None
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(file_field.url)
        return file_field.url

    @staticmethod
    def _bilingual(en_value, bg_value):
        return {
            "en": en_value,
            "bg": bg_value,
        }


class TagSerializer(BilingualSerializerMixin, serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["id", "name", "name_en", "name_bg"]

    def get_name(self, obj):
        return self._bilingual(obj.name_en, obj.name_bg)


class CourseSerializer(BilingualSerializerMixin, serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()
    about_title = serializers.SerializerMethodField()
    about_description_top = serializers.SerializerMethodField()
    about_description_bottom = serializers.SerializerMethodField()
    about_image = serializers.SerializerMethodField()
    audience_image = serializers.SerializerMethodField()
    audience_tags = serializers.SerializerMethodField()
    instruments = serializers.SerializerMethodField()
    outcomes = serializers.SerializerMethodField()
    modules = serializers.SerializerMethodField()

    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, write_only=True, required=False, source="tags"
    )

    class Meta:
        model = Course
        fields = [
            "id",
            "slug",
            "title",
            "start",
            "image",
            "description",
            "duration",
            "type",
            "price",
            "is_active",
            "stripe_product_id",
            "stripe_price_id",
            "tags",
            "tag_ids",
            "audience",
            "about_title",
            "about_description_top",
            "about_description_bottom",
            "about_image",
            "audience_image",
            "audience_tags",
            "instruments",
            "outcomes",
            "modules",
            "title_en",
            "title_bg",
            "description_en",
            "description_bg",
            "duration_en",
            "duration_bg",
            "about_title_en",
            "about_title_bg",
            "about_description_top_en",
            "about_description_top_bg",
            "about_description_bottom_en",
            "about_description_bottom_bg",
        ]

    def get_title(self, obj):
        return self._bilingual(obj.title_en, obj.title_bg)

    def get_description(self, obj):
        return self._bilingual(obj.description_en, obj.description_bg)

    def get_duration(self, obj):
        return self._bilingual(obj.duration_en, obj.duration_bg)

    def get_about_title(self, obj):
        return self._bilingual(obj.about_title_en, obj.about_title_bg)

    def get_about_description_top(self, obj):
        return self._bilingual(obj.about_description_top_en, obj.about_description_top_bg)

    def get_about_description_bottom(self, obj):
        return self._bilingual(obj.about_description_bottom_en, obj.about_description_bottom_bg)

    def get_about_image(self, obj):
        return self._file_url(obj.about_image)

    def get_audience_image(self, obj):
        return self._file_url(obj.audience_image)

    def get_audience_tags(self, obj):
        return [
            {
                "title": self._bilingual(card.title_en, card.title_bg),
                "text": self._bilingual(card.text_en, card.text_bg),
            }
            for card in obj.audience_tag_cards.all()
        ]

    def get_instruments(self, obj):
        return [
            {
                "name": self._bilingual(item.name_en, item.name_bg),
                "icon": self._file_url(item.icon),
            }
            for item in obj.instrument_cards.all()
        ]

    def get_outcomes(self, obj):
        return [
            self._bilingual(item.text_en, item.text_bg)
            for item in obj.outcome_cards.all()
        ]

    def get_modules(self, obj):
        return [
            {
                "title": self._bilingual(module.title_en, module.title_bg),
                "description": [
                    self._bilingual(row.text_en, row.text_bg)
                    for row in module.description_rows.all()
                ],
            }
            for module in obj.module_cards.all()
        ]


class EventSerializer(BilingualSerializerMixin, serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, write_only=True, required=False, source="tags"
    )

    class Meta:
        model = Event
        fields = ["id", "title", "date", "type", "tags", "tag_ids", "title_en", "title_bg"]

    def get_title(self, obj):
        return self._bilingual(obj.title_en, obj.title_bg)


class PostSerializer(BilingualSerializerMixin, serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, write_only=True, required=False, source="tags"
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "title",
            "author",
            "content",
            "picture",
            "created_at",
            "tags",
            "tag_ids",
            "title_en",
            "title_bg",
            "content_en",
            "content_bg",
        ]

    def get_title(self, obj):
        return self._bilingual(obj.title_en, obj.title_bg)

    def get_content(self, obj):
        return self._bilingual(obj.content_en, obj.content_bg)


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = "__all__"
