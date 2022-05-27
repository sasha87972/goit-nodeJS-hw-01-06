const { User } = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const image = await Jimp.read(tmpUpload);
  image.resize(250, 250).write(tmpUpload);

  const finalName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, finalName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", finalName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
