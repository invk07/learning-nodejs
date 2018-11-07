const http = require('http');
const url = require('url');

const routes = {
    home: () => {
        return {
            code: 200,
            payload: {
                welcome_message: 'Welcome!'
            }
        }
    },
    not_found: () => {
        return {
            code: 404,
            callback: {
                error: 'Not Found'
            }
        }
    }
};

const httpServer = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const handler = routes[trimmedPath] || routes.not_found;
    let { code, payload } = handler();
    res.statusCode = code;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
});

httpServer.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
