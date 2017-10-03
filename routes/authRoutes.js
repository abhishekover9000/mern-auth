const passport = require("passport");
const mongoose = require("mongoose");

module.exports = app => {
	// Google Authentication
	app.get(
		"/auth/google/callback",
		passport.authenticate("google"),
		(req, res) => {
			res.redirect("/dashboard");
		}
	);

	app.get(
		"/auth/google",
		passport.authenticate(
			"google",
			{
				scope: ["profile", "email"]
			},
			{
				successRedirect: "/",
				failureRedirect: "/login"
			}
		),
		function(req, res) {
			res.redirect("/users/" + req.user.username);
		}
	);

	// Facebook Authentication
	app.get(
		"/auth/facebook",
		passport.authenticate(
			"facebook",
			{
				authType: "reauthenticate",
				callBackURL: "auth/facebook/callback"
			},
			{
				scope: ["public_profile", "email"]
			},
			{
				successRedirect: "/",
				failureRedirect: "/login"
			}
		),
		function(req, res) {
			res.redirect("/users/" + req.user.username);
		}
	);

	app.get(
		"/auth/facebook/callback",
		passport.authenticate("facebook", { failureRedirect: "/login" }),
		function(req, res) {
			res.redirect("/dashboard");
		}
	);

	//Local Auth
	const User = mongoose.model("User");
	app.post("/auth/register", function(req, res) {
		console.log(req.body);
		User.register(
			new User({
				username: req.body.username,
				email: req.body.emailAddress
			}),
			req.body.password,
			function(err, user) {
				if (err) {
					return res.render("register", { user: user });
				}

				passport.authenticate("local")(req, res, function() {
					res.redirect("/login");
				});
			}
		);
	});

	app.post("/auth/login", passport.authenticate("local"), async function(
		req,
		res
	) {
		const userId = await User.findOne({ email: req.body.email });
		res.send({ errors: "null", redirect: "/dashboard", user: userId._id });
	});

	// Authentication API
	app.get("/", (req, res) => {
		res.send({
			hi: "there"
		});
	});

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});
};
