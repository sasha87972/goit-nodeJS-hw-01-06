const { Contact } = require("../../models/contact");

async function removeContact(req, res, next) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({
    status: 200,
    message: "contact deleted",
    data: result,
  });
}
module.exports = removeContact;
