from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0012_course_installment_and_visits"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="slug",
            field=models.SlugField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="post",
            name="slug",
            field=models.SlugField(max_length=255, unique=True),
        ),
    ]
