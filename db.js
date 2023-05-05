const articles = require("./data/articles.json");
const comments = require("./data/comments.json");

module.exports = () => {
  return {
    articles: articles,
    comments: comments,
  };
};
