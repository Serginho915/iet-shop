from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_event_request"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="description_bg",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="event",
            name="description_en",
            field=models.TextField(blank=True, null=True),
        ),
    ]
