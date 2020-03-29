const { blogName } = require("../config");

const AuthenticationService = require("../services/authenticationService");

module.exports = class LogoutController {
  static logout(req, res) {
    let cookieName = AuthenticationService.deleteSession(req.cookies);
    res.clearCookie(cookieName);
    res.redirect('/login?logoutMsg="succesfull"')
  }
};
