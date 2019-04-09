// création de notre lier avec notre fichier functions.js qui contient nos functions
const func = require('functions')
const express = require('express')
const app = express();
const morgan = require('morgan');


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

app.get('/api/v1/members/:id',(req, res) => {
    res.json(func.success(members[(req.params.id)-1].name)) // ajouter func pour appliquer nos fonctions
})

app.get('/api/v1/members',(req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(func.success(members.slice(0, req.query.max))) // ajouter func pour appliquer nos fonctions
    } else if (req.query.max != undefined) { 
        res.json(func.error('Wrong max value'))  // ajouter func pour appliquer nos fonctions
    } else {
        res.json(func.success(members)) // ajouter func pour appliquer nos fonctions
    }
})

app.listen(8080, () => console.log('Started on port 8080'))

