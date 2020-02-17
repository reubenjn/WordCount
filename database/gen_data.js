require('./database')
const mongoose = require('mongoose');

const words = mongoose.model('words');
const articles = mongoose.model('articles');
const sources = mongoose.model('sources');

// Delete data from collections.
mongoose.connection.collections.words.deleteMany({});
mongoose.connection.collections.articles.deleteMany({});
mongoose.connection.collections.sources.deleteMany({});


// Add data to collections.
sourcesArray = [
    {
        name: 'CNN'
    },
    {
        name: 'NPR'
    }
].map(x => new sources(x))
sourcesArray.forEach(x => x.save());

articlesArray = [
    {
        url: 'www.cnn.com',
        name: 'You can\'t handle the truth',
        sourceId: 'CNN',
    },
    {
        url: 'www.npr.com',
        name: 'You\'re only saying that because no one ever has',
        sourceId: 'NPR',
    },
    {
        url: 'www.cnn.com',
        name: 'How\'s the serenity?',
        sourceId: 'CNN',
    }
].map(x => new articles({...x, sourceId: sourcesArray.find(y => y.name === x.sourceId).id}));
articlesArray.forEach(x => x.save());

wordsArray = [
    {
        word: "australia",
        articleId:'You can\'t handle the truth',
        sourceId:'CNN',
        num:22
    },
    {
        word: "australia",
        articleId:'You\'re only saying that because no one ever has',
        sourceId:'NPR',
        num:5
    },
    {
        word: "australia",
        articleId:'How\'s the serenity?',
        sourceId:'CNN',
        num:3
    },
    {
        word: "koala",
        articleId:'You can\'t handle the truth',
        sourceId:'CNN',
        num:17
    },
    {
        word: "kangaroo",
        articleId:'You can\'t handle the truth',
        sourceId:'CNN',
        num:2
    }
].map(x => new words({...x, articleId: articlesArray.find(y => y.name === x.articleId).id, sourceId: sourcesArray.find(y => y.name === x.sourceId).id}));
wordsArray.forEach(x => x.save());