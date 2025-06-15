import { Request } from 'express';

interface AuthPayloadSchema {
  access_token: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthPayloadSchema;
}
