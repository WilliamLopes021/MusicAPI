import { Controller } from "../../types/Controller";
import { HttpRequest } from "../../types/HttpRequest";
import { HttpResponse } from "../../types/HttpResponse";

export class RefreshController implements Controller {
  // constructor(private authService: IAuthService) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { token } = request.cookies;

    return {
      statusCode: 200,
      body: "success",
    };
  }
}
