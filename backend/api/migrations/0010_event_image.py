from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0009_event_description_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="events/"),
        ),
    ]
