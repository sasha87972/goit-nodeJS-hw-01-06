const { Contact } = require("../../models/contact");

async function getById(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: 200,
    data: {
      result,
    },
  });
}
module.exports = getById;
