const express = require('express')
// instance de cette variable "express"
const app = express()

// '/api' c'est l'URL que l'on souhaite, pas besoin de 
app.get('/api', (req, res) => {
    res.send('Root API') // pour répondre on utilise 'send', pas besoin de 'read' ou 'write', 'root api', pour dire que c'est la racine de l'api
})


// création d'une seconde route
app.get('/api/v1', (req, res) => {
    res.send('API version 1')
})




// il faut lancer notre application
// pour indiquer là où on va l'envoyer, le port 8080
app.listen(8080, () => console.log('Started on port 8080')) // on a pu enlever les {} car c'est une seule instructions. {console.log('Started on port 8080')})

