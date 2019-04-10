const {success, error} = require('functions')

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

    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        res.json(success(members[index]))
    }
})


app.put('/api/v1/members/:id', (req, res) => {

    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        let same = false;
        for(let i = 0; i < members.length; i ++) {
            if(req.body.name == members[i].name && req.params.id != members[i].id) {
                same = true
                break
            }
        }

        if (same) {
            res.json(error('same name')) 
        } else {
            members[index].name = req.body.name
            res.json(success(true))
        }
    }
})

// méthode http DELETE qui va nous permettre de supprimer un membre, le code est similaire à notre app.get, c'est juste la réponse qui est différente.
app.delete('/api/v1/members/:id', (req, res) => {
    
    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        members.splice(index, 1) 
        res.json(success(members))
    }
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
                id: createID(), // fonction createID créer pour ajouter dans l'ordre nos membres, afin de régler le problème de la suppression qui mets les ID dans le désordre
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


function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id)
        return i
    }
    return 'wrong id'
}

function createID() {
    return members[members.length-1].id + 1
}