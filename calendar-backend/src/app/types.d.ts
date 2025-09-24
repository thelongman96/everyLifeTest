interface EventPayload {
  name: string;
  start: string;
  end: string;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface RegisterPayload extends AuthPayload {
  firstName: string;
  lastName: string;
}
