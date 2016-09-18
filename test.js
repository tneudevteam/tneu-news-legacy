'use strict';
const expect = require('chai').expect;
const nock = require('nock');
const sinon = require('sinon');
const mockery = require('mockery');

describe('News', function() {
  const newsParserMock = {
    parseArticle: sinon.stub().returns({}),
    parseArticleSnippets: sinon.stub().returns([{}, {}, {}, {}, {}])
  };
  let index;

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('tneu-news-parser', newsParserMock);

    index = require('./index');
  });

  afterEach(function() {
    newsParserMock.parseArticle.reset();
    newsParserMock.parseArticleSnippets.reset();
    nock.cleanAll();
  });

  it('should define two methods', function() {
    expect(index.getArticle).to.be.a('function');
    expect(index.getSnippets).to.be.a('function');
  });

  it('should make request to tneu to get list of snippets', function() {
    const api = nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);

    return index.getSnippets()
      .then(() => {
        expect(api.isDone()).to.be.true;
      });
  });

  it('should make request for news snippets with passed page number', function() {
    const api = nock('http://www.tneu.edu.ua')
      .get(/\/news/)
      .reply(200, uri => {
        expect(uri).to.equal('/news/page/3');
      });

    return index.getSnippets(3)
      .then(() => {
        expect(api.isDone()).to.be.true;
      });
  });

  it('should call parser to get list of snippets', function() {
    nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);
    return index.getSnippets()
      .then(() => {
        expect(newsParserMock.parseArticleSnippets.called).to.be.true;
      });
  });

  it('should return a requested number of snippets', function() {
    nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);

    return index.getSnippets(null, 3)
      .then(snippets => {
        expect(snippets).to.have.length(3);
      });
  });

  it('should make request to tneu to get article', function() {
    const api = nock('http://www.tneu.edu.ua').get(/\/news*/).reply(200);

    return index.getArticle('http://www.tneu.edu.ua/news/9585-v-profkomi-studentiv')
      .then(() => {
        expect(api.isDone()).to.be.true;
      });
  });

  it('should reject an error if article not found', function() {
    nock('http://www.tneu.edu.ua').get(/\/news*/).reply(404);

    return index.getArticle('http://www.tneu.edu.ua/news/9585-v-profkomi-studentiv')
      .catch(error => {
        expect(error.statusCode).to.equal(404);
      });
  });
});
