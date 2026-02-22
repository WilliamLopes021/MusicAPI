
// export class AuthController {
//   constructor(private readonly authService: IAuthService) {}

//   public login: RequestHandler = async (req, res) => {
//     // const response = await this.authService.login(req.body);
//     // res.cookie("refreshToken", response.rawToken);
//     res.status(200).json({ success: true });
//     // res.status(500).json({ error: e.message });
//   };
//   refresh = async (req: Request, res: Response): Promise<void> => {
//     try {
//       // const response = await this.authService.login(req.body);
//       // res.cookie("refreshToken", response.rawToken);
//       // res.status(200).json(response);
//     } catch (e) {
//       // res.status(500).json({ error: e.message });
//     }
//   };
//   activateAccount = async (req: Request, res: Response): Promise<void> => {
//     try {
//       // const response = await this.authService.login(req.body);
//       // res.cookie("refreshToken", response.rawToken);
//       // res.status(200).json(response);
//     } catch (e) {
//       // res.status(500).json({ error: e.message });
//     }
//   };

//   resend = async (req: Request, res: Response): Promise<void> => {
//     try {
//       // const response = await this.authService.login(req.body);
//       // res.cookie("refreshToken", response.rawToken);
//       // res.status(200).json(response);
//     } catch (e) {
//       // res.status(500).json({ error: e.message });
//     }
//   };
// }

/*
JavaScript old version:

import authService from "../services/authService.js";

const authController = {
  async login(req, res, next) {
    try {
      const response = await authService.login(req.body);
      res.cookie("refreshToken", response.rawToken);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },

  async refresh(req, res, next) {
    try {
      const cookie = req.cookies;
      const response = await authService.refresh(cookie);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  },
  
  async activateAccount(req, res, next) {
    try {
      const response = await authService.activateAccount(req.body, req.user);
      res.json(response);
    } catch (e) {
      next(e);
    }
  },
  
  async resend(req, res, next) {
    try {
      const response = await authService.resendCode(req.body);

      if (typeof response === "string") {
        res.status(400).json(response);
        return;
      }

      res.json(response);
    } catch (e) {
      next(e);
    }
  },
};

export default authController;

*/
