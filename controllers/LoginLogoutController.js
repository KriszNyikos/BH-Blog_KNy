const { blogName, AUTH_COOKIE } = require("../config.json");

module.exports = class LoginController {
  constructor(authenticationService) {
    this.authenticationService = authenticationService
  }

  logoutUser(req, res) {
    let cookieName = this.authenticationService.deleteSession(req.cookies);
    res.clearCookie(cookieName);
    res.redirect('/login?logoutMsg="succesfull"')
  }

  loginUser(req, res) {
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

    if (this.authenticationService.userValidator(user, password)) {
      console.log("jelszó rendben");
      const sessionId = this.authenticationService.registerSession(user);
      res.cookie(AUTH_COOKIE, sessionId);
      return res.redirect("/admin");
    }
    console.log(`${user} számára belépés megtagadva`);
    res.redirect('/login?error="credentials"');
  }


  renderLoginView(req, res) {

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