const articles = require("./data/articles.json");
const comments = require("./data/comments.json");
const users = require('./data/users.json');

module.exports = () => {
  return {
    articles: articles,
    comments: comments,
    users: users,
  };
};
