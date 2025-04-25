console.log("hola docker");
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));