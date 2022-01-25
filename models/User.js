const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create the User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//define table columns and configuration
User.init(
  {
    //define and id column
    id: {
      //use the special sequelize dataupes object to provide what type of data it is
      type: DataTypes.INTEGER,
      //equivalent on sql not null
      allowNull: false,
      //instruct that this is the Prinary key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true
    },
    //define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //define and email column 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //no duplicate emails allowed
      unique: true,
      //if allownull is set to false, we can run our data through the validator before the table is created
      validate: {
        isEmail: true
      }
    },
    //define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password muse be at least 4 characters
        len: [4]
      }
    }
  },
  {
    hooks: {
      //set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
        //set up befureUpdate lifycycle "hook" functionality
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
 
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports= User;