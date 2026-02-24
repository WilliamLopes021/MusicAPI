import { Controller } from "../../contracts/controllers/Controller";
import { HttpRequest } from "../../contracts/http/HttpRequest";
import { HttpResponse } from "../../contracts/http/HttpResponse";

export class LoginController implements Controller {
  // constructor(private authService: IAuthService) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;

    return {
      statusCode: 200,
      body: "success",
    };
  }
}
