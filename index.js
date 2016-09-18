const news = require('tneu-news-parser');
const got = require('got');

const BASE_URL = 'http://www.tneu.edu.ua/news';

/**
 * Get specific number of news snippets by page number
 * @param {Number} [page=1] News page number
 * @param {Number} [count=15] Number of snippets to return
 * @return {Promise.<Object[]>} Array of news snippet objects
 */
function getSnippets(page, count) {
  page = page || 1;
  count = count || 15;
  const url = `${BASE_URL}/page/${page}`;

  return got(url)
    .then(response => {
      return news.parseArticleSnippets(response.body);
    })
    .then(snippets => {
      return snippets.slice(0, count)
    });
}

/**
 * Get news article by direct link
 * @param {String} link Link to full news article
 * @return {Promise.<Object>} News article object
 */
function getArticle(link) {
  return got(link)
    .then(response => {
      return news.parseArticle(response.body);
    });
}

module.exports = {
  getSnippets,
  getArticle
};
