module.exports = {
  //GET
  getPosts(req, res) {
    res.status(200).send(req.store.posts);
  },
  //POST
  addPost(req, res) {
    req.store.posts.push(req.body);
    res.sendStatus(201);
  },
  //PUT
  updatePost(req, res) {
    const postId = req.params.id;
    Object.assign(req.store.posts[postId], req.body);
    res.sendStatus(204);
  },
  //DELETE
  removePost(req, res) {
    const postId = req.params.id;
    console.log(`removing post number ${postId}`);
    req.store.posts.splice(postId);
    console.log(req.store.posts);
    res.sendStatus(204);
  }
};
