module.exports = {
    port: process.env.PORT || 3002,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/almundo'
}