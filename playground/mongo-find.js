// mongo client help you connect to the database and manipulate the
// database
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        // return here to stop the code running if error occur
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // find() return a mongo db cursor point to thousands of document.

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    // provides query in the find() method --------------------------
    // db.collection('Todos').find({ completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({user: 'Da fuck'}).toArray().then((docs) => {
        console.log(`Users: ${JSON.stringify(docs, undefined, 2)}`); 
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });


    db.close();
});