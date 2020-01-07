/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("user_profiles", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"' // this is how we associate a profile with a specific user.
    },
    about: {
      type: "text"
    },
    thumbnail: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
