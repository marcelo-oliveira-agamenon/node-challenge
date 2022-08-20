const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');
const should = chai.should();

chai.use(chaiHttp);
let token;
let postId;
describe('/GET token API', () => {
  it('it should GET JWT token from API', async () => {
    chai
      .request(server)
      .get('/api/token')
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token');
      });
  });
});

describe('/POST create post', () => {
  it('it should POST an post in database', async () => {
    const postBody = {
      title: 'Post body mock mocha',
      body: 'lorem ipsum',
      tags: ['tag1'],
    };

    chai
      .request(server)
      .post('/api/posts')
      .send(postBody)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.be.equal(postBody);
      });
  });
});

describe('/GET post', () => {
  it('it should GET all posts from page', async () => {
    chai
      .request(server)
      .get('/api/posts')
      .set({ Authorization: `Bearer ${token}` })
      .query({
        page: 1,
        limit: 4,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        postId = res.body[0].id;
      });
  });
});

describe('/GET one post', () => {
  it('it should GET one post', async () => {
    chai
      .request(server)
      .get(`/api/posts/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });
});
