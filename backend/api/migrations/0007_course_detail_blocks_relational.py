import django.db.models.deletion
from django.db import migrations, models


def migrate_course_json_blocks(apps, schema_editor):
    Course = apps.get_model("api", "Course")
    CourseAudienceTagCard = apps.get_model("api", "CourseAudienceTagCard")
    CourseInstrument = apps.get_model("api", "CourseInstrument")
    CourseOutcome = apps.get_model("api", "CourseOutcome")
    CourseModule = apps.get_model("api", "CourseModule")
    CourseModuleDescription = apps.get_model("api", "CourseModuleDescription")

    for course in Course.objects.all():
        audience_tags = course.audience_tags or []
        for idx, item in enumerate(audience_tags, start=1):
            title = ""
            text = ""
            if isinstance(item, (list, tuple)) and len(item) >= 2:
                title = str(item[0] or "")
                text = str(item[1] or "")
            elif isinstance(item, dict):
                title = str(item.get("title") or "")
                text = str(item.get("text") or "")
            CourseAudienceTagCard.objects.create(
                course=course,
                order=idx,
                title_en=title or None,
                title_bg=title or None,
                text_en=text or None,
                text_bg=text or None,
            )

        instruments = course.instruments or []
        for idx, item in enumerate(instruments, start=1):
            if isinstance(item, dict):
                name = str(item.get("name") or "")
                icon = item.get("icon") or None
            else:
                name = str(item or "")
                icon = None
            CourseInstrument.objects.create(
                course=course,
                order=idx,
                name_en=name or None,
                name_bg=name or None,
                icon=icon,
            )

        outcomes = course.outcomes or []
        for idx, item in enumerate(outcomes, start=1):
            text = str(item or "")
            CourseOutcome.objects.create(
                course=course,
                order=idx,
                text_en=text or None,
                text_bg=text or None,
            )

        modules = course.modules or []
        for idx, item in enumerate(modules, start=1):
            title = ""
            description_rows = []
            if isinstance(item, dict):
                title = str(item.get("title") or "")
                description_rows = item.get("description") or []
            module = CourseModule.objects.create(
                course=course,
                order=idx,
                title_en=title or None,
                title_bg=title or None,
            )
            for d_idx, row in enumerate(description_rows, start=1):
                text = str(row or "")
                CourseModuleDescription.objects.create(
                    module=module,
                    order=d_idx,
                    text_en=text or None,
                    text_bg=text or None,
                )


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_drop_base_text_fields_keep_i18n"),
    ]

    operations = [
        migrations.CreateModel(
            name="CourseAudienceTagCard",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(default=1)),
                ("title_en", models.CharField(blank=True, max_length=255, null=True)),
                ("title_bg", models.CharField(blank=True, max_length=255, null=True)),
                ("text_en", models.TextField(blank=True, null=True)),
                ("text_bg", models.TextField(blank=True, null=True)),
                (
                    "course",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="audience_tag_cards", to="api.course"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="CourseInstrument",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(default=1)),
                ("name_en", models.CharField(blank=True, max_length=255, null=True)),
                ("name_bg", models.CharField(blank=True, max_length=255, null=True)),
                ("icon", models.ImageField(blank=True, null=True, upload_to="courses/instruments/")),
                (
                    "course",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="instrument_cards", to="api.course"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="CourseModule",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(default=1)),
                ("title_en", models.CharField(blank=True, max_length=255, null=True)),
                ("title_bg", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "course",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="module_cards", to="api.course"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="CourseOutcome",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(default=1)),
                ("text_en", models.TextField(blank=True, null=True)),
                ("text_bg", models.TextField(blank=True, null=True)),
                (
                    "course",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="outcome_cards", to="api.course"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.CreateModel(
            name="CourseModuleDescription",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("order", models.PositiveSmallIntegerField(default=1)),
                ("text_en", models.CharField(blank=True, max_length=255, null=True)),
                ("text_bg", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "module",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="description_rows", to="api.coursemodule"),
                ),
            ],
            options={"ordering": ["order", "id"]},
        ),
        migrations.RunPython(migrate_course_json_blocks, migrations.RunPython.noop),
        migrations.RemoveField(model_name="course", name="audience_tags"),
        migrations.RemoveField(model_name="course", name="instruments"),
        migrations.RemoveField(model_name="course", name="outcomes"),
        migrations.RemoveField(model_name="course", name="modules"),
    ]
