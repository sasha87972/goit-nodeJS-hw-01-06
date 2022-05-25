const { Contact } = require("../../models/contact");

async function updateContact(req, res) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
  }
  res.json({
    status: "200",
    data: {
      result,
    },
  });
}
module.exports = updateContact;
