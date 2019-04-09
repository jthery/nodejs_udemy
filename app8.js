const func = require('functions')
const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const members = [
    {
        id: 1,
        name: 'John'
    },
    {
        id:2,
        name: 'Julie'
    },
    {
        id:3,
        name: 'Jack'
    }
]

app.use(morgan('dev'))
app.use(bodyParser.json()); // lié à l'utilisation du middleware BodyParser
app.use(bodyParser.urlencoded({extended: true})); // lié à l'utilisation du middleware BodyParser


app.get('/api/v1/members/:id',(req, res) => {
    res.json(func.success(members[(req.params.id)-1].name))
})

app.get('/api/v1/members',(req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(func.success(members.slice(0, req.query.max)))
    } else if (req.query.max != undefined) { 
        res.json(func.error('Wrong max value'))
    } else {
        res.json(func.success(members))
    }
})

//  requete en POST, afin d'ajouter un membre
app.post('/api/v1/members', (req, res) => {
    res.send(req.body) // <----- pour le post on utilise comme paramètre "body"
})

app.listen(8080, () => console.log('Started on port 8080'))