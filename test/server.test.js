const request = require('supertest');
const expect = require('expect');

const { app } = require('../server/server');
const {Todo} = require('../server/model/todo');
const { ObjectID } = require('mongodb');

// this delete database before running test
const todos = [{
    text: 'First test todo'
}, {
    text: 'Second test todo'
}];

let id;

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then((res) => {
        id = res[0]._id;
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text';
        
        request(app)
          .post('/todos')
          .send({ text })
          .expect(200)
          .expect((res) => {
              expect(res.body.text).toBe(text);
          })
          .end((err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.find({ text: 'Test todo text' }).then((todos) => {
                  expect(todos.length).toBe(1);
                  expect(todos[0].text).toBe(text);
                  done();
              }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
          .post('/todos')
          .send({ })
          .expect(400)
          .end((err, res) => {
              if (err) {
                  return done(err);
              }

              Todo.find().then((todos) => {
                  expect(todos.length).toBe(2);
                  done();
              }).catch((e) => done(e));
          })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
          .get('/todos')
          .expect(200)
          .expect((res) => {
              expect(res.body.todos.length).toBe(2);
          })
          .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should get the todo from the id', (done) => {
        request(app)
          .get(`/todos/${id}`)
          .expect(200)
          .expect((res) => {
              expect(res.body.doc).toInclude({ text: 'First test todo'});
          })
          .end(done);
    })

    it('should return text if id not found', (done) => {
        let newID = id + '1';
        request(app)
          .get(`/todos/${newID}`)
          .expect(404)
          .end(done);
    })

    it('should return text if id not found', (done) => {
        let newID = new ObjectID().toHexString();
        request(app)
          .get(`/todos/${newID}`)
          .expect(404)
          .end(done);
    })
});