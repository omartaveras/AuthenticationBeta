const express = require("express");


const app = express();


//Listen the server for running in Cloud(C9, DOcean)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started...  .  .  .    .");
});
