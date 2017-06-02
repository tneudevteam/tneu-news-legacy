jest.mock('tneu-news-parser');

const nock = require('nock');
const news = require('tneu-news-parser');
const index = require('.');

news.parseArticle.mockImplementation(() => ({}));
news.parseArticleSnippets.mockImplementation(() => [{}, {}, {}, {}, {}]);

afterEach(() => {
  nock.cleanAll();
});

it('should define two methods', () => {
  expect(index.getArticle).toBeInstanceOf(Function);
  expect(index.getSnippets).toBeInstanceOf(Function);
});

it('should make request to tneu to get list of snippets', () => {
  const api = nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);

  return index.getSnippets().then(() => {
    expect(api.isDone()).toBeTruthy();
  });
});

it('should make request for news snippets with passed page number', () => {
  const api = nock('http://www.tneu.edu.ua')
    .get(/\/news/)
    .reply(200, uri => {
      expect(uri).toBe('/news/page/3');
    });

  return index.getSnippets(3).then(() => {
    expect(api.isDone()).toBeTruthy();
  });
});

it('should call parser to get list of snippets', () => {
  nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);

  return index.getSnippets().then(() => {
    expect(news.parseArticleSnippets).toBeCalled();
  });
});

it('should return a requested number of snippets', () => {
  nock('http://www.tneu.edu.ua').get(/\/news/).reply(200);

  return index.getSnippets(null, 3).then(snippets => {
    expect(snippets).toHaveLength(3);
  });
});

it('should make request to tneu to get article', () => {
  const url = 'http://www.tneu.edu.ua/news/9585-v-profkomi-studentiv';
  const api = nock('http://www.tneu.edu.ua').get(/\/news*/).reply(200);

  return index.getArticle(url)
    .then(() => {
      expect(api.isDone()).toBeTruthy();
    });
});

it('should reject an error if article not found', () => {
  const url = 'http://www.tneu.edu.ua/news/9585-v-profkomi-studentiv';
  nock('http://www.tneu.edu.ua').get(/\/news*/).reply(404);

  return index.getArticle(url).catch(error => {
    expect(error.statusCode).toBe(404);
  });
});
