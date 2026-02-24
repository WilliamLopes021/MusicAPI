//   async confirmEmailChange(req, res, next) {
//     try {
//       const { code } = req.body;
//       const response = await userService.confirmEmailChange(code, req.user.id);
//       res.json(response);
//     } catch (e) {
//       next(e);
//     }
//   },