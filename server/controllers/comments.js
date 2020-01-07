function create(req, res) {
  const db = req.app.get("db");
  const { comment } = req.body;
  const { userId, postId } = req.params;

  db.comments
    .insert({
      userId,
      postId,
      comment
    })
    .then(comment => res.status(201).json(comment))
    .catch(err => {
      console.error(err);
    });
}

function updateComment(req, res) {
  const db = req.app.get("db");
  const { commentId } = req.params;
  const { comment } = req.body;
  db.comments
    .save({ id: commentId, comment })
    .then(comment => res.status(200).json(comment))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  create,
  updateComment
};
