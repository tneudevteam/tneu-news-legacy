# TNEU News

> Get latest news from [tneu.edu.ua](http://www.tneu.edu.ua/news/)

[![npm](https://img.shields.io/npm/v/tneu-news.svg?maxAge=2592000)](https://www.npmjs.com/package/tneu-news)
[![Build Status](https://travis-ci.org/vladgolubev/tneu-news.svg?branch=master)](https://travis-ci.org/vladgolubev/tneu-news)
[![Coverage Status](https://coveralls.io/repos/github/vladgolubev/tneu-news/badge.svg?branch=master)](https://coveralls.io/github/vladgolubev/tneu-news?branch=master)

## Install

Ensure you have [Node.js](https://nodejs.org) version 4 or higher installed. Then run the following:

```
$ npm install tneu-news --save
```

## Usage

```javascript

const news = require('tneu-news');

news.getSnippets()
  .then(snippets => {
    // Array of snippets
  });

news.getArticle('http://www.tneu.edu.ua/news/9671-naukovo-praktychne-zabezpechennia.html')
  .then(article => {
    // Article object
  });

```

## API

### getSnippets([page], [count])

Get specific number of news snippets by page number

| [page]       | [count]       |
| ------------ | ------------- |
| Number (`1`) | Number (`15`) |

Returns a Promise resolving array of objects:

```javascript
[
  {
    title: 'На кафедрі фінансів імені...',
    date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
    topic: 'Міжнародні програми',
    imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
    description: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
    readMoreLink: 'http://www.tneu.edu.ua/news/9678-na-kafedri....'
  }, {/* 14 more... */}
]
```

### getArticle(link)

Get news article by direct link

Returns a Promise resolving article object:

```javascript
{
  title: 'На кафедрі фінансів імені...',
  date: 'Sun Sep 18 2016 19:31:25 GMT+0300 (EEST)',
  imageLink: 'http://www.tneu.edu.ua/uploads/posts/2016-09/....',
  author: 'Відділ інформації та зв`язків з громадськістю ',
  text: '14 вересня 2016 р. студенти та викладачі кафедри фінансів...',
  photos: ['http://www.tneu.edu.ua/uploads/posts/...', '....'],
  attachments: [{
    name: '....',
    link: '....'
  }]
}
```

Rejects a Promise in case of invalid link.

## Development

### Tests

Used: chai, mocha, nock, sinon, mockery

```
$ npm test
```

### Coverage

Used: istanbul

```
$ npm run coverage
```

### Linting

Used: eslint, eslint-config-google

```
$ npm run lint
```
