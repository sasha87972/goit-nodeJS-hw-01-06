const { Contact } = require("../../models/contact");

async function addContact(req, res) {
  const newContact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
}

module.exports = addContact;
