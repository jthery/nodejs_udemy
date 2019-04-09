// pour plus d'infos aller sur le site expressjs.com, aller dans request

const express = require('express')
// instance de cette variable "express"
const app = express();

// ajout de notre middlewares, voir la doc expressjs.com
// "next" approporiement dit une variable, mais une fonction qu'on va utiliser pour dire que le traitement du middlewares est fini
app.use((req, res, next) => {
    console.log('URL : ' + req.url) // chaque requete, il y aura un debug en console de l'url appelé pour chaque requete.
    next() //exécuter la fonction
})
// si on fait une recherche d'URL on peut constater dans notre terminal que c'est URL remonte.


// '/api' c'est l'URL que l'on souhaite
app.get('/api', (req, res) => {
    res.send('Root API') // pour répondre on utilise 'send', pas besoin de 'read' ou 'write', 'root api', pour dire que c'est la racine de l'api
})


// création d'une seconde route (page)
app.get('/api/v1', (req, res) => {
    res.send('API version 1')
})


// création d'une nouvelle page avec un paramètre, :id sera remplacer par la valeur dans l'URL, c'est variable qu'on va définir
// :id2 est un exemple pour faire voir qu'on peut attribuer plusieurs paramètres d'une requete en get
app.get('/api/v1/books/:id/:id2', (req, res) => {
    res.send(req.params) // params permet d'obtenir les différentes propriétées des paramètres
})


// il faut lancer notre application
// pour indiquer là où on va l'envoyer, le port 8080
app.listen(8080, () => console.log('Started on port 8080')) // on a pu enlever les {} car c'est une seule instructions. {console.log('Started on port 8080')})
