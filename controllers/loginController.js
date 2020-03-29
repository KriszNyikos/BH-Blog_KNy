const AuthenticationService = require("../services/authenticationService");
const { blogName, AUTH_COOKIE } = require("../config.json");

module.exports = class LoginController {
  static post(req, res) {
    let user = req.body.user;
    let password = req.body.password;

    if (!user || !password) {
      let text = ''
      if (!password) {
        text = 'password'
      }

      if (!user) {
        text = 'username'
      }

      if (!password && !user) {
        text = 'username and assword'
      }
      console.log(`Error: Missing ${text}`)
     return res.redirect(`/login?missing="${text}"`);
    }

    if (AuthenticationService.userValidator(user, password)) {
      console.log("jelszó rendben");
      const sessionId = AuthenticationService.registerSession(user);
      res.cookie(AUTH_COOKIE, sessionId);
      return res.redirect("/admin");
    }
    console.log(`${user} számára belépés megtagadva`);
    res.redirect('/login?error="credentials"');
  }

  static get(req, res) {

    if (req.query.error) {
      return res.render("loginView", {
        error: `Error: invalid${req.query.error}`,
        blogName
      });
    }

    if (req.query.logoutMsg) {
      return res.render('loginView', {
        logOutMessage: `Logout is ${req.query.logoutMsg}`
      })

    }

    if (req.query.missing) {
      return res.render('loginView', {
        missing: `${req.query.missing}`
      })
    }

    res.render("loginView");
  };
}