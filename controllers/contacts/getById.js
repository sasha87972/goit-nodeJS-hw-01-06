const contactOperations = require("../../models/contacts");

async function getById(req, res, next) {
  const { contactId } = req.params;
  const result = await contactOperations.getContactById(contactId);
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
