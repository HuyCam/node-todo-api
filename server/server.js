const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');

let app = express();

const port = process.env.PORT || 3000;

// bodyParser middleware parse all the req.body.
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.send(doc)
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos, code: 'OK'});
    }, (err) => {
        res.status(400).send(err); 
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(404).send('Invalid id requested');
    }

    Todo.findById(id).then((doc) => {
        if (!doc) {
            res.status(404).send('Cant not find that ID');
        } else {
            res.send({doc, status: 'OK'});
        }
        
    }, (err) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log('Started on port 3000');
})

module.exports = {
    app
}