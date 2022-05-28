/* eslint-disable no-unused-vars */
const Conflict = require("http-errors");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = nanoid();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url({ email });

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Confirm your password</a>`,
  };

  await sendEmail(mail);

  const result = await User.create({
    verificationToken,
    name,
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};
module.exports = register;
