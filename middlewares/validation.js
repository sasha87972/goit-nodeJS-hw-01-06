const createError = require("http-errors");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    next();
  };
};

module.exports = validation;
