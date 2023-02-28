const { verifyToken } = require("../token");
function authorize(roles = []) {
  return (req, res, next) => {
    const token = req.headers?.authorization;

    //verify token
    const payload = verifyToken(token);

    console.log("token ", token);
    console.log("role ", roles);
    console.log("token ", payload);

    if (payload?._id) {
      //token is valid
      const { _id, role } = payload;
      console.log("role", role);
      if (roles.includes(role)) {
        next();
      } else {
        //no permission to aceess current role
        res.status(401).send({
          message: "You do not permission to access the api",
          error: null,
        });
      }
    } else {
      res.status(420).send({ message: "Access token expired", error: null });
    }
  };
}
module.exports = authorize;
