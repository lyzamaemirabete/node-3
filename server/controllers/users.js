function create(req, res) {
  const db = req.app.get("db");

  const { email, password } = req.body;

  db.users
    .insert(
      {
        email,
        password,
        user_profiles: [
          // this is what is specifying the object
          // to insert into the related 'user_profiles' table
          {
            userId: undefined,
            about: null,
            thumbnail: null
          }
        ]
      },
      {
        deepInsert: true // this option here tells massive to create the related object
      }
    )
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.error(err);
    });
}

function list(req, res) {
  const db = req.app.get("db");

  db.users
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function getById(req, res) {
  const db = req.app.get("db");

  db.users
    .findOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function getProfile(req, res) {
  const db = req.app.get("db");

  db.user_profiles
    .findOne({
      userId: req.params.id
    })
    .then(profile => res.status(200).json(profile))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  create,
  list,
  getById,
  getProfile
};
