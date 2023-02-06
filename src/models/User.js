const S = require("sequelize");
const db = require("../db");
const bcrypt = require('bcrypt')


class User extends S.Model {

}

User.init({
        email: {
          type: S.STRING,
          allowNull: false,
        },
        password: {
          type: S.STRING,
          allowNull: false,
        },
        salt: {
          type: S.STRING,
        },
        name: {
          type: S.STRING,
          allowNull: false,
        },
        lastname: {
          type: S.STRING,
          allowNull: false,
        },
},  { sequelize: db, modelName: "user" });

// INSTANCE METHOD
User.prototype.createHash = function(plainPassword, salt){
    return bcrypt.hash(plainPassword, salt).then((hash) => {
            return hash
    })
}

User.prototype.validatePassword = function(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password)
  }

//HOOK
User.beforeCreate((user) => {
    const salt = bcrypt.genSaltSync(8);
    user.salt = salt;
  
    return user.createHash(user.password, user.salt).then((hash) => {
      user.password = hash;
    });
  });


module.exports = User;