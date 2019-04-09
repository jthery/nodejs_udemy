const express = require('express')
const app = express();
const morgan = require('morgan');

// création d'un tableau contenant des objets id et name
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

// création de notre route pour récupérer nos membres un à un
app.get('/api/v1/members/:id',(req, res) => {
    res.send(members[(req.params.id)-1].name)
})

// création de notre route pour récupérer tous nos membres en une seule route
app.get('/api/v1/members',(req, res) => {
    // req.query récupère tous les paramètres après le "?max=3"
    // req.query.max > 0, lorsqu'on recherchera sans attribué de nombre à "?max=", et bien qu'il nous retourne l'intégralité.
    if (req.query.max != undefined && req.query.max > 0) {
        // ce qui correspond au ID de 0 à jusqu'au maximum
        res.send(members.slice(0, req.query.max))
        // sinon on renvoit tous l'objet
    } else {
        res.send(members)
    }
})

app.listen(8080, () => console.log('Started on port 8080'))
