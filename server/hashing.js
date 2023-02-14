var bcrypt = require("bcrypt");

exports.cryptPassword = function (password) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return console.log(err);

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return console.log(err);
      return hash;
    });
  });
};

exports.comparePassword = function (plainPass, hashword) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? isPasswordMatch : console.log(err);
  });
};
