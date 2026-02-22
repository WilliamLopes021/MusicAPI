import { Request, Response, NextFunction } from "express";
import { Controller } from "../../app/types/Controller";

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const httpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        headers: req.headers,
      };

      const httpResponse = await controller.handle(httpRequest);

      return res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
      next(error);
    }
  };
}
