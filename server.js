
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (error)=>{
        if(error){
            console.log('Unable to append to file');
        }
    });
    next();
});

// app.use((req, res)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle:'Home page',
        welcomeMessage:'Hola Express!!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
       errorMessage:'Sorry...bad request'
    });
});


app.listen(port, ()=>{
    console.log(`Your felera node server is up and running on port ${port}!`);
});