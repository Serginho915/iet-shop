from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_course_interface_alignment"),
    ]

    operations = [
        migrations.AddField(
            model_name="tag",
            name="name_bg",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="tag",
            name="name_en",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_bottom_bg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_bottom_en",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_top_bg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_description_top_en",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_title_bg",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="about_title_en",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="description_bg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="description_en",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="duration_bg",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="duration_en",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="title_bg",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="title_en",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="event",
            name="title_bg",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="event",
            name="title_en",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="content_bg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="content_en",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="title_bg",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="post",
            name="title_en",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
