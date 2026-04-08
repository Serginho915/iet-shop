import stripe
from urllib.parse import urljoin

from django.conf import settings

from .models import Course


SUCCESS_PATH = "/success"
CANCEL_PATH = "/cancel"
DEFAULT_FRONTEND_ORIGIN = "http://localhost:3000"


def configure_stripe() -> None:
    stripe.api_key = settings.STRIPE_SECRET_KEY


def resolve_course_by_slug(slug: str) -> Course:
    return Course.objects.get(slug=slug, is_active=True)


def resolve_frontend_origin(request) -> str:
    origin = request.headers.get("Origin")
    if origin:
        return origin.rstrip("/")

    referer = request.headers.get("Referer", "")
    if referer:
        parts = referer.split("/", 3)
        if len(parts) >= 3:
            return f"{parts[0]}//{parts[2]}"

    return DEFAULT_FRONTEND_ORIGIN


def build_frontend_url(request, relative_path: str) -> str:
    return urljoin(f"{resolve_frontend_origin(request)}/", relative_path.lstrip("/"))


def build_checkout_line_item(course: Course) -> dict:
    # Course prices are stored in minor units already (for example 69000 = EUR 690.00).
    unit_amount = int(course.price)
    course_name = (course.title_en or course.title_bg or course.slug).strip()

    return {
        "price_data": {
            "currency": "eur",
            "product_data": {
                "name": course_name,
            },
            "unit_amount": unit_amount,
        },
        "quantity": 1,
    }


def create_checkout_session(course: Course, request, customer_email: str | None = None) -> stripe.checkout.Session:
    configure_stripe()

    line_items = [build_checkout_line_item(course)]
    if course.stripe_price_id:
        line_items = [{"price": course.stripe_price_id, "quantity": 1}]

    session_data = {
        "mode": "payment",
        "payment_method_types": ["card"],
        "line_items": line_items,
        "success_url": build_frontend_url(request, SUCCESS_PATH),
        "cancel_url": build_frontend_url(request, CANCEL_PATH),
        "metadata": {
            "course_slug": course.slug,
            "course_id": str(course.id),
        },
    }

    if customer_email:
        session_data["customer_email"] = customer_email

    return stripe.checkout.Session.create(**session_data)
