  var forever = require('forever-monitor');
  

  var child = new (forever.Monitor)('app.js', {
    silent: false,
    options: []
  });

  child.on('exit', function () {
    console.log('your-filename.js has exited.');
  });

  child.start();
