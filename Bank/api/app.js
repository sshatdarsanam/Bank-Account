let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let port = 3090;
let router = require('./routers/myBankRouters');
app.use(router);
app.listen(port);
console.log('Listening on port' + port);