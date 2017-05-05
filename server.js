const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if (err){
      console.log('Unable to append to server.log');
    }
  });
  next();
})


// app.use((req,res,next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamit',(txt)=>{
  return txt.toUpperCase();
})


app.get('/',(req,res) => {
  res.render('index.hbs',{
    pgTitle : 'Welcome to this rendered page',
    txt : 'This is not a boring company, this is a cool company',
    cny : 'The Cool Company'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pgTitle : 'About page',
    txt : 'This is the page where you talk about the',
    cny : 'This is the company name'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'This is a bad request'
  })
})

app.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});
