import uuid

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_require_manual_slugs'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatSession',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('session_key', models.CharField(db_index=True, max_length=64, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['-updated_at', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('sender_type', models.CharField(choices=[('user', 'User'), ('operator', 'Operator'), ('bot', 'Bot')], max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('chat_session', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='messages', to='api.chatsession')),
            ],
            options={
                'ordering': ['created_at', 'id'],
            },
        ),
    ]