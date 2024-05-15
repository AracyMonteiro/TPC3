const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const conexaoBD = require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const User = require('./models/User');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

conexaoBD.authenticate()
.then(() => {
    console.log('Conexao a BD ok!');
    conexaoBD.sync({force: true})
    .then(() => {
        console.log('Modelos sincronizados com sucesso!');
        app.listen(8000);
    })
    .catch((erro) => {
        console.log(erro.message);

    })
})

.catch((erro) => {
    console.log(erro.message);
    process.exit(1);
});


