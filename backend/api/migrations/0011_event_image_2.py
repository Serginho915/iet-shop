from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_event_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="image_2",
            field=models.ImageField(blank=True, null=True, upload_to="events/"),
        ),
    ]
