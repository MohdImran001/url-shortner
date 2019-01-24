const express = require('express');
const bodyParser = require('body-parser');
const urlObject = require('./models/urlObject');
const mongoose = require('mongoose');
const linkCheck = require('link-check');
const helpers = require('./helpers');
//middle_wares
var app = express()
app.use(express.static('public'))
app.use(bodyParser.json());

//mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/urlShortener', {useNewUrlParser: true})

mongoose.connection.once('open', () => {
    console.log('mongodb is running on port 27017')
}).on('error', (err) => {
    console.log('Error', err)
})

//MAIN APIs
app.get('/', async (req, res) => {
    res.send("URL SHORTEN SERVICE") // TODO: redirect it to front end 
})

app.get('/:url', (req, res) => {
    // TODO: add some security check
    if(req.params.url.length > 0 && req.params.url !== undefined)
    {
        urlObject.findOne({shortUrl: req.params.url}).then((obj) => {
            if(obj !== null)
            {
                res.redirect(obj.originalUrl)
            }
            else
            {
                helpers.getTemplate('404', function(err, str){
                    if(!err && str && str.length > 0)
                        res.status(404).send(str)
                    else
                        res.status(500).send(err);
                });
            }
        })
    }
})
 
app.post('/api/post', async (req, res) => {
    linkCheck(req.body.originalUrl, (err, result) => {
        if(!err && result.status == 'alive')
        {
              var url = new urlObject(req.body)
              urlObject.findOne({shortUrl: req.body.shortUrl}).then((obj) => {
                  if(obj == null)
                  {
                    url.save().then((obj) => {
                      res.send(obj);
                    })
                  }
                  else
                  {
                    res.status(422).send({Error: 'this url is already taken'});
                  }
              })
        }
        else
        {
            res.status(422).send({Error: 'Enter a valid url'});
            return
        }
    })
})
//SERVER
app.listen(process.env.port || 4000, () => {
    console.log('Server is running')
})
