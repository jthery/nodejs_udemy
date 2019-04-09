const func = require('functions')
const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const members = [{
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }
]

app.use(morgan('dev'))
app.use(bodyParser.json()); // lié à l'utilisation du middleware BodyParser
app.use(bodyParser.urlencoded({
    extended: true
})); // lié à l'utilisation du middleware BodyParser


app.get('/api/v1/members/:id', (req, res) => {
    res.json(func.success(members[(req.params.id) - 1].name))
})

app.get('/api/v1/members', (req, res) => {
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

    if (req.body.name) { // lancer une requete POST dans l'onglet body concernant le name

        // pour éviter d'ajouter des noms identiques
        for (let i = 0; i < members.length; i++) { // tant que i est inférieur à members
            if (members[i].name == req.body.name) { // si le nom est égale à un nom existant
                res.json(func.error('name already taken')) // on renvoi une erreur
            }
        }

        let member = { // variable member qui va être appliquer par members.push
            id: members.length + 1, // le length permet d'avoir la quantité de nos id dans le tableau, pour que je puisse à chaque ajout de membre avec le "+1" le rajouter à la suite.
            name: req.body.name // ajout un nom avec le paramètre body de POST.
        }

        members.push(member); // on récupère la variable member pour en suite le push.

        res.json(func.success(member)) // on réutilise notre fonction du module créer pour renvoyer un status "success"

    } else {
        res.json(func.error('no name value')) // on utilise notre fonction "error" si le name est similaire.
    }

   // res.send(req.body) // pour le post on utilise comme paramètre "body", on doit le supprimer car on fait une autre structure ci-dessu

})

app.listen(8080, () => console.log('Started on port 8080'))