const arc = require('@architect/functions');

function route(req, res) {
  res({
    json: {
      message: 'hello world!',
    },
  });
}

exports.handler = arc.http(route);
