require('./database')
const mongoose = require('mongoose');

const words = mongoose.model('words');
const articles = mongoose.model('articles');
const sources = mongoose.model('sources');

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
