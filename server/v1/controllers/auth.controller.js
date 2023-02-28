const { result } = require("lodash");
const UserModel = require("../models/user.model");
const { compareHash } = require("../../helpers/encryption");
const { createToken, verifyToken } = require("../../helpers/token");
const UserCtrl = require("./user.controller");

class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        console.log("result", result);
        if (!result) throw new Error("Invalid email");
        else if (compareHash(password, result.password)) {
          const accessToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            10 * 60
          );
          const refreshToken = createToken(
            {
              _id: result._id,
              role: result.role,
            },
            60 * 60
          );
          console.log("accessToken");
          res.set("x-access-token", accessToken);
          res.set("x-refresh-token", refreshToken);

          res.status(200).send({
            message: "login successfully ",
            data: UserCtrl.pickUser(result),
          });
        } else {
          res.status(404).send({ message: "Invalid password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Invalid email or user is disabled" });
      });
  }

  static validateToken(req, res) {
    const token = req.headers.authorization;

    const payload = verifyToken(token);

    if (payload?._id) {
      const { _id } = payload;

      UserModel.findOne({ _id })
        .then((result) => {
          res
            .status(200)
            .send({ data: UserCtrl.pickUser(result), message: "Valid token" });
        })
        .catch((err) => {
          console.log(err);
          throw new Error("invalid token");
        });
    } else {
      res.status(403).send({ message: "Invlaid Token", error: null });
    }
  }

  static refreshToken(req, res) {
    const { access, refresh } = req.body;

    const payload = verifyToken(refresh);

    if (payload?._id) {
      const accessT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 10
      );

      const refreshT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 60
      );

      res
        .status(200)
        .send({ data: { accessT, refreshT }, message: "token created" });
    } else {
      res.status(403).send({ message: "session expired", error: null });
    }
  }
}

module.exports = AuthCtrl;
