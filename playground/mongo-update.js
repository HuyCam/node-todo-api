
// mongo client help you connect to the database and manipulate the
// database
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        // return here to stop the code running if error occur
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectId('5b023525aacb59832fcd8caa')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId("5b0171b76bbc3e22603b9d9d")
    }, {
        $inc: {
            money: 5000
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log(err);
    })

    db.close();
});