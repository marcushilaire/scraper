var express = require("express");
var bodyParser = require("body-parser");
var cheerio = require("cheerio");
var request = require("request")
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/HardwareScraper");
var PORT = 3000;


app.get("/scrape", function(req,res){

    request("https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=100007709%204814%20601201888%20601203793%20601204369%20601296707%20601301599&IsNodeId=1&cm_sp=Cat_video-Cards_1-_-Visnav-_-Gaming-Video-Cards_1", function(error, response, html) {
    var $ = cheerio.load(html);
  
    var results = [];
  

    $("div.item-container").each(function(i,element){
      var link=$(element).find("a").attr("href")
      var title = $(element).find("a").children().attr("title")
      var image = $(element).find("a").children().attr("src")
      var price = $(element).find("div.item-info").find("div.item-action").find("ul.price").find("li.price-current").find("strong").text()
      
      results.push({
        link:link,
        title:title,
        image:image,
        price:price
      })
    
      db.Hardware.create(results).then(function(dbHardware){
        console.log(dbHardware)
      }).catch(function(err){
          res.json(err)
      })
    })
    console.log(results)

  });
    res.send("Scrape complete")
  })
  
app.get("/hardware", function(req,res){
    db.Hardware.find({})
    .then(function(dbHardware){
        res.json(dbHardware)
    }).catch(function(err){
        res.json(err)
    })
})

app.get("/hardware/:id", function(req,res){
    db.Hardware.findOne({_id:req.params.id}).populate("note")
    .then(function(dbHardware){
        res.json(dbHardware)
    }).catch(function(err){
        res.json(err)
    })
})
app.post("/hardware/:id", function(req,res){
    db.Note.create(req.body).then(function(dbNote){
        return db.Hardware.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    }).then(function(dbHardware){res.json(dbHardware)})
    .catch(function(err){
        res.json(err)
    })
})
app.listen(PORT, function(){
    console.log("app loaded "+ PORT)
})
