const { Contact } = require("../../models/contact");

async function listContacts(req, res) {
  const response = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      response,
    },
  });
}

module.exports = listContacts;
