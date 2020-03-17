exports.handler = function(events, context, callback) {
  const send = () => {
    callback(null, {
      statusCode: 200,
      body: 'Helloworld',
    });
  };

  if (events.httpMethod === 'GET') {
    send();
  }
};
