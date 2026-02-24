  // async update(req, res, next) {
  //   try {
  //     const updatedPost = await postService.update(
  //       req.params.id,
  //       req?.user.id,
  //       req.body,
  //     );
  //     return res.json(updatedPost);
  //   } catch (e) {
  //     next(e);
  //   }
  // },