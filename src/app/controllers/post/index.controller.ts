  // async index(req, res, next) {
  //   try {
  //     const allPosts = await postService.index();
  //     if (allPosts?.message) return res.status(200).json(allPosts.message);

  //     res.json(allPosts);
  //   } catch (e) {
  //     next(e);
  //   }
  // },