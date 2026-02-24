import { AuthenticatedUser } from "../dtos/AuthenticatedUser";

export interface HttpRequest<T = any> {
  body?: T;
  params?: any;
  query?: any;
  headers?: any;
  cookies?: any;
  user?: AuthenticatedUser;
}
