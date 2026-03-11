from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_event_image_2"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="monthly_installment_price",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="visits_per_week",
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
    ]
