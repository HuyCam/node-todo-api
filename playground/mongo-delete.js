const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        // return here to stop the code running if error occur
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat luch'}).then((result) => {
    //     console.log(result.result);
    // }, (err) => {
    //     console.log('Can not delete that');
    // });

    // // deleteOne: delete the first item match the filter
    // db.collection('Todos').deleteOne({text: 'Eat dinner'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     conosle.log(err);
    // });

    // findOneAndDelete: delete that document and return the document 

    // db.collection('Todos').findOneAndDelete({text: 'Walk the dog'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     conosle.log(err);
    // });

    // practice
    db.collection('todos').findOneAndDelete({text: '  Finish things  '}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to remove', err);
    });

    db.close();
});