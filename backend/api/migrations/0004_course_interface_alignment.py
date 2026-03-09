from django.db import migrations, models


def map_course_audience_values(apps, schema_editor):
    Course = apps.get_model("api", "Course")
    Course.objects.filter(audience="adult").update(audience="adults")
    Course.objects.filter(audience="minor").update(audience="kids")


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_course_age_group_post_slug"),
    ]

    operations = [
        migrations.RenameField(
            model_name="course",
            old_name="age_group",
            new_name="audience",
        ),
        migrations.RunPython(
            map_course_audience_values,
            migrations.RunPython.noop,
        ),
        migrations.AlterField(
            model_name="course",
            name="audience",
            field=models.CharField(
                blank=True,
                choices=[("adults", "Adults"), ("kids", "Kids")],
                max_length=10,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="course",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="courses/"),
        ),
        migrations.AlterField(
            model_name="post",
            name="picture",
            field=models.ImageField(blank=True, null=True, upload_to="posts/"),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_bottom",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_top",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_image",
            field=models.ImageField(blank=True, null=True, upload_to="courses/about/"),
        ),
        migrations.AddField(
            model_name="course",
            name="about_title",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="audience_image",
            field=models.ImageField(blank=True, null=True, upload_to="courses/audience/"),
        ),
        migrations.AddField(
            model_name="course",
            name="audience_tags",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="instruments",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="modules",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="outcomes",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
