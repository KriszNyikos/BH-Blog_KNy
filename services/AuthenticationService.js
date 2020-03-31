
const { AUTH_COOKIE } = require("../config.json");

/*const users = [{ user: "admin", password: "password" }];
const sessions = {};*/

module.exports = class AuthenticationService {
  constructor(users, sessions){
    this.users = users,
    this.sessions = sessions
  }
   registerSession(user) {
    let id = Math.floor(Math.random() * 10000);
    this.sessions[id] = { user: user };
    //console.log(sessions);
    return id;
  }

   deleteSession(cookies) {
    let sessionId = cookies[AUTH_COOKIE];

    if (this.sessions[sessionId]) {
      delete this.sessions[sessionId];
    }
    return AUTH_COOKIE;
  }

   returnAuthor(id) {
    console.log(id, this.sessions);
    return this.sessions[id].user;
  }

   userValidator(user, password) {
    console.log(`${user} vizsgálata`);
    return this.users.find(us => us.user === user && us.password === password);
  }

   findSession(cookie) {
    return this.sessions[cookie];
  }
};
