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
            res.json(func.error('name already taken')) 
        } else { // notre partie de non erreur

            let member = { 
                id: members.length + 1,
                name: req.body.name
            }

            members.push(member);
    
            res.json(func.success(member))
        }

    } else {
        res.json(func.error('no name value'))
    }
})

app.listen(8080, () => console.log('Started on port 8080'))