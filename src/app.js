const app = require('express')();
const bodyParser = require('body-parser');

const config = require('./config');
const router = require('./routes');

app.use(bodyParser.json());
app.use('/', router);

// error handler
app.use((err, req, res) => {
    res.status(500);
    res.render('Server Error!');
});

app.listen(config.port, () => {
    console.log('App listening on port 3000!');
});
