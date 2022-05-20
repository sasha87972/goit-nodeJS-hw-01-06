const contactOperations = require("../../models/contacts");

async function listContacts(req, res, next) {
  const result = await contactOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = listContacts;
