const passport = require("passport");

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
