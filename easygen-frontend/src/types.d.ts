import type { JWTPayload } from 'jose';

interface SignInParams {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserJwt extends JWTPayload {
  id: string;
  email: string;
}

interface ErrorResponse {
  message: string
  statusCode: number
}
