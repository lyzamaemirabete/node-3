function create(req, res) {
  const db = req.app.get("db");

  const { content } = req.body;
  const { userId } = req.params;

  db.posts
    .insert({
      userId,
      content
    })
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.error(err);
    });
}

function viewPostByPostId(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  db.posts
    .findOne(id)
    .then(results => {
      let content = results;
      req.query.postId
        ? db.comments
            .find({ postId: req.query.postId })
            .then(results => {
              res.status(200).send({ post: content, comments: results });
            })
            .catch(err => {
              console.error(err);
              res.status(500).end;
            })
        : res.status(200).send(results);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function viewPostsByUserId(req, res) {
  const db = req.app.get("db");
  const { userId } = req.params;

  db.posts
    .find({ userId: userId })
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function updatePost(req, res) {
  const db = req.app.get("db");
  const { postId } = req.params;
  const { content } = req.body;
  db.posts
    .save({ id: postId, content })
    .then(post => res.status(200).json(post))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function allPosts(req, res) {
  const db = req.app.get("db");

  db.posts
    .find()
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  create,
  viewPostByPostId,
  viewPostsByUserId,
  updatePost,
  allPosts
};
