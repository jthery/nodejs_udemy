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
    res.json(success(members[(req.params.id)-1].name)) // nous avons transformé les res.send en res.json + ajout de notre fonction "success"
})

app.get('/api/v1/members',(req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.query.max))) // nous avons transformé les res.send en res.json + ajout de notre fonction "success"
    } else if (req.query.max != undefined) { // si jamais ?max= n'est pas défini de valeur, on renvoila fonctionn error
        res.json(error('Wrong max value')) // on y ajoute notre fonction "error"
    } else {
        res.json(success(members)) // nous avons transformé les res.send en res.json + ajout de notre fonction "success"
    }
})

app.listen(8080, () => console.log('Started on port 8080'))

// function success qui comprend une variable result afin de retourner un status success si on reprend bien des membres
function success(result) {
    return {
        status: 'success',
        result: result
    }
}

// function error qui comprend une variable membre afin de retourner un status error si on n'a aucun résultat
function error(message) {
    return {
        status: 'error',
        message: message 
    }
}