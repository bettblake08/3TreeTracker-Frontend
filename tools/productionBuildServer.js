/* eslint-disable no-console */
var express = require("express");
var path = require("path");
var port = process.env.PORT || 3000;

var app = express()

app.use(express.static(path.join(__dirname, "../dist") ));

app.use("*", function(_req, res) {
    return res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, function (err) {
    if (err) { console.log(err.message) }

    console.log("\n3TreeTracker");
    console.log("-----------------------------------");
    console.log(`Listening on port ${port}`);
})