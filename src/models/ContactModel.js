const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  createdAt: { type: Date, default: Date.now() },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.cleanUp = function () {
  for (let value of Object.values(this.body)) {
    if (typeof value !== "string") {
      value = "";
    }
  }

  this.body = {
    name: this.body.name,
    surname: this.body.surname,
    email: this.body.email,
    phone: this.body.phone,
  };
};

Contact.prototype.validate = function () {
  this.cleanUp();

  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.errors.push("Invalid email.");
  }

  if (!this.body.name) {
    this.errors.push("Name is required.");
  }

  if (!this.body.email && !this.body.phone) {
    this.errors.push(
      "At least one contact information (in addition to name) must be filled in: E-mail or Phone."
    );
  }
};

Contact.prototype.create = async function () {
  this.validate();

  if (this.errors.length > 0) {
    return;
  }

  this.contact = await ContactModel.create(this.body);
};

Contact.prototype.edit = async function (id) {
  console.log(id);
  if (typeof id !== "string") {
    return;
  }
  this.validate();
  console.log("passei do validate");
  if (this.errors.length > 0) {
    return;
  }

  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

//static methods
Contact.searchById = async function (id) {
  if (typeof id !== "string") return;
  const contact = await ContactModel.findById(id);
  return contact;
};

Contact.searchAllContacts = async function () {
  //order by DESC (-1)
  const contacts = await ContactModel.find().sort({ createdAt: -1 });
  return contacts;
};

module.exports = Contact;
