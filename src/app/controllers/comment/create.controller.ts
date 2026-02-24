// const commentController = {
//   async create(req, res, next) {
//     try {
//       const response = await commentService.create(
//         req?.user.id,
//         req.params.id,
//         req.body,
//       );
//       res.status(200).json(response);
//     } catch (e) {
//       next(e);
//     }
//   },