const passport = require("passport");
const oAuthGoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

//To configure go to console.developers.google.com
passport.use(
	new oAuthGoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleID: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({
				googleID: profile.id,
				email: profile.email
			}).save();
			done(null, user);
		}
	)
);

// To configure go to
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: "/auth/facebook/callback"
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ facebookID: profile.id });
			const existingEmail = await User.findOne({ email: profile.email });
			if (existingUser) {
				return done(null, existingUser);
			} else if (existingEmail) {
				await existingEmail.update({ facebookID: profile.id });
				const user = await User.findOne({ facebookID: profile.id });
				done(null, user);
			}
			const user = await new User({
				facebookID: profile.id,
				email: profile.email
			}).save();
			done(null, user);
		}
	)
);

// Passport Local strategy
passport.use(new LocalStrategy(User.authenticate()));
