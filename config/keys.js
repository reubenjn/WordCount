module.exports = process.env.NODE_ENV === 'production' ? {
    production: true,
    mongoURI: process.env.MONGO_URI
} : require('./dev');