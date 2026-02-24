import { HttpRequest } from "../http/HttpRequest";
import { HttpResponse } from "../http/HttpResponse";

export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>;
}
