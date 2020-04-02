const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const secret = require("./config").secretOrKey;
const User = require("../models/user");

exports = passport => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
      },
      (payload, done) => {
        User.findById(payload.id).then(user => {
          if (!user) {
            done(null, false);
          } else {
            done(null, user);
          }
        });
      }
    )
  );
};
