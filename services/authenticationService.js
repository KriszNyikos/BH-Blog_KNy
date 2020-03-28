const users = [{ user: "admin", password: "password" }];

const sessions = {};

const { blogName, AUTH_COOKIE } = require("../config.json");

module.exports = class AuthenticationService {
  static registerSession(user) {
    let id = Math.floor(Math.random() * 10000);
    sessions[id] = { user: user };
    console.log(sessions);
    return id;
  }

  static deleteSession(cookies) {
    let sessionId = cookies[AUTH_COOKIE];

    if (sessions[sessionId]) {
      delete sessions[sessionId];
    }
    return AUTH_COOKIE;
  }

  static returnAuthor(id) {
    console.log(id, sessions);
    return sessions[id].user;
  }

  static userValidator(user, password) {
    console.log(`${user} vizsgálata`);
    return users.find(us => us.user === user && us.password === password);
  }

  static sessionFind(cookie) {
    return sessions[cookie];
  }
};
