const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.signedCookies.token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        success: false,
        message: "토큰이 만료되었습니다.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "유효하지 않는 토큰입니다.",
    });
  }
};
