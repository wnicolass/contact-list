const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  cleanUp() {
    for (let value of Object.values(this.body)) {
      if (typeof value !== "string") {
        value = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.errors.push("Invalid email");
    }

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push("Password must be between 3 and 50 characters long");
    }
  }

  async userAlreadyExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (this.user) {
      this.errors.push("User already exists.");
    }
  }

  async signin() {
    this.validate();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Your email or password may be incorrect.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Invalid password.");
      this.user = null;
      return;
    }
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.userAlreadyExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }
}
module.exports = Login;
