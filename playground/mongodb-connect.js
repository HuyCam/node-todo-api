// mongo client help you connect to the database and manipulate the
// database
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        // return here to stop the code running if error occur
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to access todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     user: 'Da fucksss',
    //     age: 24,
    //     location: 'Koreass',
    //     lover: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to access users', err);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    db.close();
});