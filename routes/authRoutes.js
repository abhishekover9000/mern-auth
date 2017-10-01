const passport = require("passport");

module.exports = app => {
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
