const {success, error} = require('functions') // on à remplacer notre variable "func" par les fonctions directement appelé depuis notre module "functions.js"
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
        id: 2,
        name: 'Julie'
    },
    {
        id: 3,
        name: 'Jack'
    }
]

app.use(morgan('dev'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/v1/members/:id', (req, res) => {

    // on fait appel à notre fonction "getIndex" qui sera = à index pour éviter de récrire pluseiurs fois cette ligne
    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))  // en cas d'error, ça sera notre message d'erreur
    } else {
        res.json(success(members[index])) // on récupère le membre
    }

    // plus besoin étant donné qu'on a changé notre méthode d'ajout de membre.
    // res.json(success(members[(req.params.id) - 1].name))
})

app.get('/api/v1/members', (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        res.json(success(members.slice(0, req.query.max)))
    } else if (req.query.max != undefined) {
        res.json(error('Wrong max value'))
    } else {
        res.json(success(members))
    }
})

app.post('/api/v1/members', (req, res) => {

    if (req.body.name) {

        // notre partie de vérification
        let sameName = false
        for (let i = 0; i < members.length; i++) { 
            if (members[i].name == req.body.name) { 
                sameName = true 
                break
            }
        }

        // notre partie d'erreur
        if (sameName) {
            res.json(error('name already taken')) 
        } else { // notre partie de non erreur

            let member = { 
                id: members.length + 1,
                name: req.body.name
            }

            members.push(member);
    
            res.json(success(member))
        }

    } else {
        res.json(error('no name value'))
    }
})

app.listen(8080, () => console.log('Started on port 8080'))



// ajout d'une fonction pour simplifier l'ajout d'un membre, on va donc remplacer notre code actuel par cette fonction.
function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id)
        return i
    }
    return 'wrong id'
}