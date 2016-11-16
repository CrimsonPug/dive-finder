const express = require('express');
const app = express();
const cheerio = require('cheerio');
const request = require('request');
const https = require('https');
const diveCtrl = require('./dive.ctrl.js');

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req,res)=>{           
    res.render('pages/index');   
})

app.get('/dive/:diveId', (req, res) => {
    const diveId = req.params.diveId;
    res.render('pages/dive',{diveList:diveCtrl.getDiveByID(diveId)});
})

app.get('/search/:lat&:lng', (req,res) => {
    let lat = req.params.lat;
    let lng = req.params.lng;
    url = 'http://api.divesites.com/?mode=sites&lat=' + lat + '&lng=' + lng + '&dist=25';

    request (url, function (error,response,body){
        if (error){
            console.log('There is an error');
        }else{
            var $ = cheerio.load(body);
            let temp= JSON.parse(body);
            let diveResult = [];
            console.log(temp.sites);
            for (let i = 0; i<temp.sites.length; i++){
                let currentResult = [];
                currentResult.push(temp.sites[i].name);
                currentResult.push(temp.sites[i].lat);
                currentResult.push(temp.sites[i].lng);
                currentResult.push(i+1);
                console.log(currentResult);
                //stringify the array of result 
                currentResult = currentResult.toString();
                // console.log(currentResult);
                //push string into an inv
                diveResult.push(currentResult);
            }
            diveResult = JSON.stringify(diveResult);
            console.log(diveResult);
                res.render('pages/search', {diveSites: temp.sites,coordinateY: lat, coordinateX:lng, dive:diveResult });
               
        }
    })
})

app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});
