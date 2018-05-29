const express = require('express');
const _ = require('lodash');
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



app.delete('/todos/:id', (req, res) => {
    // get the id
    const id = req.params.id;
    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({error: 'Invalid ID'});
    }
    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send('No id found');
        }

        res.send({doc});
    }).catch((e) => {
        res.status(400).send(e);
    }) 
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    //lodash pick will pick key in body object if that key is available
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        // we are the one
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: {
        text: body.text ? body.text : null,
        completed: body.completed,
        completedAt: body.completedAt
    }}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch(e => {
        res.status(400).send();
    })
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
}