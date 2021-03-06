const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.model( 'sources',
                new mongoose.Schema({
                    name: String
                }));
mongoose.model( 'articles',
                new mongoose.Schema({
                    url: String,
                    name: String,
                    sourceId: {type: mongoose.Types.ObjectId, ref: 'sources'}
                }));
mongoose.model( 'words',
                new mongoose.Schema({
                    word: String,
                    articleId: {type: mongoose.Types.ObjectId, ref: 'articles'},
                    sourceId: {type: mongoose.Types.ObjectId, ref: 'sources'},
                    num: Number
                }));
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,
                {
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true,
                    autoIndex: !keys.production,
                    autoCreate: !keys.production
                }
);