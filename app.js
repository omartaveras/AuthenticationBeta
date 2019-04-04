const   express               = require("express"),
        mongoose              = require("mongoose"),
        passport              = require("passport"),
        bodyParser            = require("body-parser"),
        User                  = require("./models/user"),
        LocalStrategy         = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose");
    
mongoose.connect('mongodb://localhost:27017/auth_demo_app', { useNewUrlParser: true });

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "call me about your name",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========
//  ROUTES
//==========

//home page
app.get("/", function(req, res){
    res.render("home");
});

//secret route
app.get("/secret",isLoggedIn, function(req, res){
    res.render("secret");
});

//Authe Routes

//show sign up form
app.get("/register", function(req, res){
    res.render("register");
});
//handing sign up form
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            console.res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//login logic
//middleware
app.post("/login", passport.authenticate("local",{
        successRedirect: "/secret",
        failureRedirect: "/login"
    }), function(req, res){    
});

//Logout Route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

//check if logined 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Listen the server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started...  .  .  .    .");
});