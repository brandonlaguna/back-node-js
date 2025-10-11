const { decodeToken } = require("../utils/decodeToken");
const { success, error } = require("../utils/response");
const userService = require("../services/user.service");

const getIdNameByTypeUser = async (req, res) => {
  try {
    const { typeUser } = req.body;
    const decodedToken = decodeToken(
      req.headers["authorization"]?.split(" ")[1]
    );

    const response = await userService.getIdNameByTypeUser(
      decodedToken,
      typeUser
    );

    if (!response) {
      return error(res, "Ocurrió un error al consultar los usuarios", 401);
    }

    return success(res, response, "Consulta satisfactoria", 200);
  } catch (e) {
    return error(res, e, 500);
  }
};

module.exports = { getIdNameByTypeUser };
