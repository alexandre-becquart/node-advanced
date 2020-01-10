const Client = require('../models/client')

// dans cette page on gère les méthodes qu'on envoie dans le projet

exports.index = async (req, res, next) => {
    //res.sendFile(`${process.cwd()}/views/index.html`)

    res.render('pages/index') // render, permet d'afficher le fichier 
}

exports.about = async (req, res, next) => {
    //res.sendFile(`${process.cwd()}/views/about.html`)
    res.render('pages/about', {
        title: 'About pageeeee', // il remplace {{title}} par 'About pageeeee'
        hasFooter: true // on lui donne l'information que cette page peu récuperer le partial footer
    })
}

exports.clients = async (req, res, next) => {
    // res.sendFile(`${process.cwd()}/views/users.html`)
    let clients = await Client.find()
    res.render('pages/clients', {
        title: 'Clients list',
        clients, // clients : clients
        ID: req.params.id
    })
}

exports.clientform = async (req, res, next) => {
    // res.sendFile(`${process.cwd()}/views/users.html`)
    res.render('pages/client-form', {
        title: 'Clients Create',

    })
}

exports.clientscreate = async (req, res, next) => {
    try { // il essaie de créer un client
        let client = new Client(req.body) // créer l'élement avec le model
        try { // il essaie de sauvegarder le nouveau client
            res.send(await client.save()) // on sauvegarde le client
        } catch (e) { // on gère l'erreur
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
}

exports.editclient = async (req, res, next) => {
    let clients = await Client.findOne({
        _id: req.params.id
    })
    console.log(clients);
    res.render('pages/edit-client', {
        title: 'Edit CLient',
        ID: req.params.id,
        firstname: clients.firstname,
        lastname: clients.lastname,


    })
}

exports.updateclient = async (req, res, next) => {
    try { // il essaie de créer un client
        let client = new Client(req.body) // créer l'élement avec le model
        try { // il essaie de sauvegarder le nouveau client
            res.send(await client.save()) // on sauvegarde le client
        } catch (e) { // on gère l'erreur
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
}