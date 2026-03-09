from django.db import migrations


def copy_base_fields_to_i18n(apps, schema_editor):
    Tag = apps.get_model("api", "Tag")
    Course = apps.get_model("api", "Course")
    Event = apps.get_model("api", "Event")
    Post = apps.get_model("api", "Post")

    for tag in Tag.objects.all():
        if not tag.name_en and tag.name:
            tag.name_en = tag.name
        if not tag.name_bg and tag.name:
            tag.name_bg = tag.name
        tag.save(update_fields=["name_en", "name_bg"])

    for course in Course.objects.all():
        fields = []
        if not course.title_en and course.title:
            course.title_en = course.title
            fields.append("title_en")
        if not course.title_bg and course.title:
            course.title_bg = course.title
            fields.append("title_bg")
        if not course.description_en and course.description:
            course.description_en = course.description
            fields.append("description_en")
        if not course.description_bg and course.description:
            course.description_bg = course.description
            fields.append("description_bg")
        if not course.duration_en and course.duration:
            course.duration_en = course.duration
            fields.append("duration_en")
        if not course.duration_bg and course.duration:
            course.duration_bg = course.duration
            fields.append("duration_bg")
        if not course.about_title_en and course.about_title:
            course.about_title_en = course.about_title
            fields.append("about_title_en")
        if not course.about_title_bg and course.about_title:
            course.about_title_bg = course.about_title
            fields.append("about_title_bg")
        if not course.about_description_top_en and course.about_description_top:
            course.about_description_top_en = course.about_description_top
            fields.append("about_description_top_en")
        if not course.about_description_top_bg and course.about_description_top:
            course.about_description_top_bg = course.about_description_top
            fields.append("about_description_top_bg")
        if not course.about_description_bottom_en and course.about_description_bottom:
            course.about_description_bottom_en = course.about_description_bottom
            fields.append("about_description_bottom_en")
        if not course.about_description_bottom_bg and course.about_description_bottom:
            course.about_description_bottom_bg = course.about_description_bottom
            fields.append("about_description_bottom_bg")
        if fields:
            course.save(update_fields=fields)

    for event in Event.objects.all():
        fields = []
        if not event.title_en and event.title:
            event.title_en = event.title
            fields.append("title_en")
        if not event.title_bg and event.title:
            event.title_bg = event.title
            fields.append("title_bg")
        if fields:
            event.save(update_fields=fields)

    for post in Post.objects.all():
        fields = []
        if not post.title_en and post.title:
            post.title_en = post.title
            fields.append("title_en")
        if not post.title_bg and post.title:
            post.title_bg = post.title
            fields.append("title_bg")
        if not post.content_en and post.content:
            post.content_en = post.content
            fields.append("content_en")
        if not post.content_bg and post.content:
            post.content_bg = post.content
            fields.append("content_bg")
        if fields:
            post.save(update_fields=fields)


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0005_add_bilingual_fields"),
    ]

    operations = [
        migrations.RunPython(copy_base_fields_to_i18n, migrations.RunPython.noop),
        migrations.RemoveField(model_name="tag", name="name"),
        migrations.RemoveField(model_name="course", name="title"),
        migrations.RemoveField(model_name="course", name="description"),
        migrations.RemoveField(model_name="course", name="duration"),
        migrations.RemoveField(model_name="course", name="about_title"),
        migrations.RemoveField(model_name="course", name="about_description_top"),
        migrations.RemoveField(model_name="course", name="about_description_bottom"),
        migrations.RemoveField(model_name="event", name="title"),
        migrations.RemoveField(model_name="post", name="title"),
        migrations.RemoveField(model_name="post", name="content"),
    ]
