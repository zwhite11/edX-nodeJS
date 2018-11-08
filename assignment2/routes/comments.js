module.exports = {
  //GET
  getComments(req, res) {
    const postId = req.params.id;
    return req.store.posts[postId].comments;
  },
  //POST
  addComment(req, res) {
    const postId = req.params.id;
    req.store.posts.comments.push(req.body);
    res.sendStatus(201);
  },
  //PUT
  updateComment(req, res) {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    req.store.posts[postId].comments[commentId] = req.body;
    res.sendStatus(204);
  },
  //DELETE
  removeComment(req, res) {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    console.log(`deleting comment ${commentId} from post ${postId}`);
    console.log(req.store.posts[postId].comments);
    req.store.posts[postId].comments.splice(commentId);
    res.sendStatus(204);
  }
};
