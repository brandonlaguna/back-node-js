const User = require("../models/User");

const typeUsers = {
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
  TEACHER: "TEACHER",
  OBSERVER: "OBSERVER",
};

const getUserById = async (_id) => {
  return User.findById(_id);
};

const getUsersByAllId = async (students) => {
  return User.find({ _id: { $in: students } });
};

const getIdNameByTypeUser = async (decodedToken, typeUserParam) => {
  try {
    if (!Object.values(typeUsers).includes(typeUserParam)) {
      throw new Error(`Tipo de usuario inválido: ${typeUserParam}`);
    }
    const filter = { ROLE: typeUserParam };
    const result = await User.find(filter).select("_id name");
    return result;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  getUserById,
  getUsersByAllId,
  getIdNameByTypeUser,
};
