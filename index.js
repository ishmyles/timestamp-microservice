let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Index Page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Base API Route
app.get("/api", (req, res) => {
  const date = new Date(Date.now());
  res.json({"unix": Date.now(), "utc": date.toUTCString()});
});

// API/[Date Parameter] Route
app.get("/api/:date", function (req, res) {
  const date = (isNaN(req.params.date)) 
    ? new Date(req.params.date) : new Date(parseInt(req.params.date));
  
  if (date.toString() === "Invalid Date") return res.json({error: "Invalid Date"});
  
  res.json({unix: Date.parse(date), utc: date.toUTCString()});
});

let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
