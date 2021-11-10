
var express = require('express');
const cors = require("cors");
var axios=require('axios');
var path = require('path');
const app =  express();
var data;
var data2;
app.use(cors());
const url2= "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const google_key='AIzaSyAt0McEtDauA1IbbSPVaKGLWwjdAruH1MU';
const url = "https://api.tomorrow.io/v4/timelines";
const tommorrow_key = "G06LeAhBiRcNeFNow9gf6QCynZdFBVxT"
//const tommorrow_key = "0UEEV356EZtl4UhZyd2g9bHW3Csnd7yQ"
// const tommorrow_key="VNFFJM1wfwl3tggdVZVcOYEnmO8UbXsd"
var request=require('request');
const { info } = require('console');
fields_params = ["temperatureApparent","temperatureMin","temperatureMax","windSpeed","windDirection","humidity","pressureSeaLevel",
                 "weatherCode","precipitationProbability","precipitationType","sunriseTime","sunsetTime","visibility","moonPhase","cloudCover"]

app.get('/api/getcurrentdweatherdetails/location',(req,res) =>{
  location = req.query.location;
  console.log(location);
  coordinates = location.split(',');
        console.log(coordinates);
        latitude = coordinates[0];
        console.log(latitude);
        longitude = coordinates[1];
        console.log(longitude);
        querystring = {"location": location, "fields": fields_params, "units": "imperial",
        "timesteps": "1d", "timezone": "America/Los_Angeles", "apikey": tommorrow_key}

  request({url:url, qs:querystring}, function(err, response, body){
    if (err) {
      return console.log(err);
    }
    else 
    data=JSON.parse(body);
    //console.log("Manasi 2:"+data);
    res.send(data);

  });
  // request({url:url, qs:querystring}, function(err, response, body){
  //   if (err) {
  //     return console.log(err);
  //   }
  //   else 
  //   data=JSON.parse(body);
  //   //console.log("Manasi 2:"+data);
  //   res.send(data);

  // });
});


app.get('/autocomplete/input', (req,res)=>{
  information=req.query.input;
  url3=url2+'?input='+information+"&key="+google_key;
  console.log(url3);
  // querystring2={"input":information, "key": google_key}
  request({url:url3}, function(err,response,body){
    console.log(req);
    if(err){
      return console.log(err);
    }
    data2=JSON.parse(body);
    console.log(JSON.parse(body)); 
    res.send(data2); 
  });
  
});


// app.get('/api/getcurrentdweatherdetails/location',async(req,res) =>{
//   location = req.query.location;
//   console.log(location);
//   // console.log(req);
//   coordinates = location.split(',');
//         console.log(coordinates);
//         latitude = coordinates[0];
//         console.log(latitude);
//         longitude = coordinates[1];
//         console.log(longitude);
//   TOMMORROW_URL="https://api.tomorrow.io/v4/timelines?location="+req.query.latitude+','+req.query.longitude+"&fields=temperature,humidity&fields=precipitation&units=metric&timesteps=1h&timezone=America/Los_Angeles&apikey="+tommorrow_key;
//           axios
//           .get(TOMMORROW_URL)
//           .then(function(resp){
//           console.log(resp.data);
//           console.log(resp.data);
//           return (resp.data);
//           });
//          .catch(function(err){
//             console.log('Error',err.message);
//           });
//           // res.send(data);
//           // res.write(data);
//           // console.log(data);
// });

app.listen(4000,()=>{
    console.log('listening on 4000........')
});
