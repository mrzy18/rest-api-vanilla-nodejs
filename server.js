import http from 'http';
import handler from './controller/userController.js';

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

const server = http.createServer((req, res) => {
  const { method, url } = req;
  res.setHeader('X-powered-by', 'Muhammad Rizky');
  res.setHeader('Content-Type', 'application/json');

  if (url === '/api/users') {
    switch (method) {
      case 'POST':
        handler.postUser(req, res)
        break;
      default:
        handler.getUsers(res);
    }
  } else if (new RegExp('/api/users/([0-9]+)').test(url)) {
    const id = Number(url.split('/')[3]);
    switch (method) {
      case 'PUT':
        handler.putUser(req, res, id);
        break;
      case 'DELETE':
        handler.deleteUser(res, id);
        break;
      default:
        handler.getUserById(res, id);
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: 'Route NOT FOUND',
      })
    );
  }
});

server.listen(PORT, HOST, () => console.info(`server running on http://${HOST}:${PORT}`));
