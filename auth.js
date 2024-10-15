const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const Person = require('./models/Person')


passport.use(new localStrategy(async (username, password, done) => {
    try {
        console.log('received credentials:', username, password);

        // find the user by username
        const user = await Person.findOne({ username });

        // if no user is found
        if (!user) {
            return done(null, false, { message: 'incorrect username.' });
        }

        // check if the password matches

        const ispasswordmatch = user.password === password; // in real case, you should hash and compare passwords securely.
        if (ispasswordmatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'incorrect password.' });
        }
    } catch (error) {
        return done(error);
    }
}));
module.exports = passport;