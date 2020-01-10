/* -------------------------------------------------------------------------- */
/*                                Node advanced                               */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 Dossier 01                                 */
/* -------------------------------------------------------------------------- */

const Express = require('express') // faire appel à express
const app = Express() // j'instancie un nouveau server. je peux avoir plusieurs serveurs sur le meme node
const router = require('./router')
require('dotenv').config({
    path: './production.env' // pour récupérer les variables environnementales dans le fichier  
})

const hbs = require("express-hbs"); // on fait appel au module

const bodyParser = require('body-parser') // on fait appel au module

const mongoose = require('mongoose') // on fait appel au module

//mongo db management
mongoose.Promise = global.Promise // pour rendre global nos promesses
mongoose.connect(process.env.DB_HOST, { // il va chercher DB_HOST dans le fichier production.env
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Mongodb server is running and ready to be called');
})

app.engine('hbs', hbs.express4({ // on indique le moteur de rendu
    partialsDir: `${process.cwd()}/views/partials`, // on lui indique le chemin pour retrouver les partials
    defaultLayout: `${process.cwd()}/views/layouts/default.hbs`
}))

app.set('view engine', 'hbs') // pour que le render puisse utiliser les hbs
app.set('views', process.cwd() + '/views') // pour que le render puisse utiliser les views
app.use(bodyParser.urlencoded({ // sémantique propre au borderParser
    extended: false
}))
app.use(bodyParser.json()) // ----------------------------------


/* --------------- envoyer la lecture du code de la page html --------------- */

// App.get('/', (req, res) => { // lors de la requête "/"  
//     //res.send('Hello world') // envoie le message "Hello world"
//     res.sendFile(`${process.cwd()}/views/index.html`)
//     next()
// }
// App.get('/about', (req, res) => { // lors de la requête "/about"  

//     res.sendFile(`${process.cwd()}/views/about.html`) // affiche le code html about.html

// })
// 
/* -------------------------------------------------------------------------- */


/* ---------------------------------- cas 1 --------------------------------- */

// App.get('/', (req, res) => {
//     console.log("log my site"); // il l'affiche mais ne log pas le code
// }, (req, res) => { // lors de la requête "/"  
//     //res.send('Hello world') // envoie le message "Hello world"
//     res.sendFile(`${process.cwd()}/views/index.html`)


// })

/* -------------------------------------------------------------------------- */

/* ---------------------------------- cas 2 --------------------------------- */
// App.get('/', (req, res) => { // lors de la requête "/"  
//     //res.send('Hello world') // envoie le message "Hello world"
//     res.sendFile(`${process.cwd()}/views/index.html`)


// }, (req, res) => {
//     console.log("log my site"); //il ne l'affiche pas
// })

/* -------------------------------------------------------------------------- */

app.use('/', router) // lors du '/' utilise les router


/* ---------------------------------- Avant --------------------------------- */

// App.listen('8001', () => {
//     console.log('App listening on port http://localhost:8001'); //création du server sur le port 8001
// })
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Après --------------------------------- */

app.listen(process.env.PORT, () => {
    console.log(`App listineng on port http://localhost:${process.env.PORT}`)
})
/* -------------------------------------------------------------------------- */