const https = require("https");
const path = require("path");
const express = require("express");
const app = express();

const staticPath = path.join(__dirname, "/public/");

app.use("/catg/css", express.static(staticPath + "css"));
app.use("/css", express.static(staticPath + "css"));
app.use("/catg/js", express.static(staticPath + "js"));
app.use("/js", express.static(staticPath + "js"));
app.set("view engine", "ejs");

let API = {
  host: "newsapi.org",
  path: "",
  headers: {
    "User-Agent": "",
  },
};

function fetchNews(API, res, message = null) {
  https.get(API, (response) => {
    let MyData = "";

    response.on("data", (chunkData) => {
      MyData += chunkData;
    });
    response.on("end", () => {
      res.render("index", {
        data: JSON.parse(MyData).articles,
        message: message,
      });
    });
    response.on("error", (errMsg) => {
      res.render("index", { data: "Error" });
    });
  });
}

// Fetch weather info function
function fetchData(API, res, address, country) {
  https.get(API, (response) => {
    let MyData = "";
    response.on("data", (chunk) => {
      MyData += chunk;
    });
    response.on("end", () => {
      res.render("weather", {
        data: JSON.parse(MyData),
        address: address,
        country: country,
        error: false,
      });
      // res.send(JSON.parse(MyData));
    });
    response.on("error", () => {
      res.send("Error 404");
    });
  });
}

function FetchWeatherInfo(req, res, city) {
  let lAPI = {
    hostname: "nominatim.openstreetmap.org",
    path: `/search/${city}?format=json&addressdetails=1&limit=1&polygon_svg=1&email=akashsardar383@gmail.com`,
    headers: {
      "User-Agent": req.get("user-agent"),
    },
  };

  let wAPI = {
    hostname: "api.openweathermap.org",
    path: `/data/2.5/onecall?lat=22&lon=88&exclude=current,minutely,hourly&appid=7f7fb990c0d07404f86fb5f5a6922579`,
    headers: {
      "User-Agent": req.get("user-agent"),
    },
  };

  https.get(lAPI, (response) => {
    let MyData = "";
    response.on("data", (chunk) => {
      MyData += chunk;
    });
    response.on("end", (loc) => {
      try {
        wAPI.path = `/data/2.5/onecall?lat=${JSON.parse(MyData)[0].lat}&lon=${
          JSON.parse(MyData)[0].lon
        }&exclude=current,minutely,hourly&appid=7f7fb990c0d07404f86fb5f5a6922579`;
        let country = JSON.parse(MyData)[0].address.country_code;
        let address = JSON.parse(MyData)[0].display_name;
        fetchData(wAPI, res, address, country.toLowerCase());
      } catch (err) {
        res.render("weather", {
          data: [],
          address: "",
          country: "",
          error: true,
        });
      }
    });
    response.on("error", () => {
      console.log("Error");
    });
  });
}

app.get("/", (req, res) => {
  const userAgent = req.get("user-agent");
  API.headers["User-Agent"] = userAgent;
  let categoryList = [
    "General",
    "Business",
    "Entertainment",
    "Science",
    "Health",
    "Sports",
    "Technology",
  ];
  const category =
    categoryList[Math.floor(categoryList.length * Math.random())];
  API.path = `/v2/top-headlines?country=in&category=${category}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
  const message = `${category} category news`;
  fetchNews(API, res, message);
});

app.get("/catg/:var", (req, res) => {
  const userAgent = req.get("user-agent");
  API.headers["User-Agent"] = userAgent;
  const category = req.params.var;
  API.path = `/v2/top-headlines?country=in&category=${category}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
  const message = `${category} category news`;
  fetchNews(API, res, message);
});

app.get("/kwchn", (req, res) => {
  const userAgent = req.get("user-agent");
  API.headers["User-Agent"] = userAgent;
  const keyword = req.query.keyword;
  const channel = req.query.channel;
  let message = "";
  if (keyword != "") {
    API.path = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    message = `"${keyword}" related news`;
  } else if (channel != "") {
    API.path = `https://newsapi.org/v2/top-headlines?sources=${channel}&apiKey=97b67ff1d2fb4d7794e9e4c77ff87876`;
    message = `News from ${channel} channel`;
  }
  fetchNews(API, res, message);
});

app.get("/weather", (req, res) => {
  let city = req.query.city;
  if (city == undefined) {
    city = "";
  }
  city = city.toString().split(" ").join("%20");
  FetchWeatherInfo(req, res, city);
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

const port = process.env.PORT || 80;
// const hostname = "127.0.0.1";

// app.listen(port, hostname, () => {
//   console.log("Success!");
//   console.log(`Server running at http://${hostname}:${port}`);
// });

app.listen(port, () => {
  console.log("Success!");
});
