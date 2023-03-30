const createServer = require('./server');

const PORT = process.env.PORT || 8080;

createServer().listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})