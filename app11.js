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

// notre méthode http PUT qui va nous permettre de modifier un membre. Le code sera similaire 
app.put('/api/v1/members/:id', (req, res) => {

    let index = getIndex(req.params.id);

    if (typeof(index) == 'string') {
        res.json(error(index))
    } else {
        // let member = members[index];
        let same = false;
        for(let i = 0; i < members.length; i ++) {
            // si le nom est similaire et l'id est similaire 
            if(req.body.name == members[i].name && req.params.id != members[i].id) {
                same = true
                break
            }
        }

        // if/else qui correspond à ma variable same.
        if (same) {
            res.json(error('same name')) 
        } else {
            members[index].name = req.body.name
            res.json(success(true))
        }
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


function getIndex(id) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].id == id)
        return i
    }
    return 'wrong id'
}