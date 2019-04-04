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

app.use(require("express-session")({
    secret: "call me about your name",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//home page
app.get("/", function(req, res){
    res.render("home");
});

//secret route
app.get("/secret", function(req, res){
    res.render("secret");
});


//Listen the server(for LocalHost =>)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started...  .  .  .    .");
});
