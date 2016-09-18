const index = require('./index');

return index.getArticle('http://www.tneu.edu.ua/news/9585-v-profkomi-studentiv-tneu-mozhna-')
  .then(resp => {

    console.log(resp);
  })
  .catch(error => {
    console.log(error);
  })
