from rest_framework.authentication import SessionAuthentication


class SessionCSRFAuthentication(SessionAuthentication):
    """Enforce CSRF for anonymous session-based endpoints without authenticating a user."""

    def authenticate(self, request):
        self.enforce_csrf(request)
        return None