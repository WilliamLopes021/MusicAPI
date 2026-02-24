import { Controller } from "../../types/Controller";
import { HttpRequest } from "../../types/HttpRequest";
import { HttpResponse } from "../../types/HttpResponse";

export class ActiveAccount implements Controller {
  // constructor(private authService: IAuthService) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { code } = request.body;

    return {
      statusCode: 200,
      body: "success",
    };
  }
}
