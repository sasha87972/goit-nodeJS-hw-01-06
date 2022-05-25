const { Contact } = require("../../models/contact");

async function updateStatus(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    const error = new Error(`Product with id=${contactId} not found`);
    error.status = 404;
  }
  res.json({
    status: "200",
    data: {
      result,
    },
  });
}
module.exports = updateStatus;
