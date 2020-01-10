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
    let clients = await Client.findOne({ // je vais chercher l'élement qui porte le même id que ma requête
        _id: req.params.id
    })
    //console.log(req.params);
    res.render('pages/edit-client', {
        title: 'Edit CLient',
        id, //ID: req.params.id
        firstname: clients.firstname,
        lastname: clients.lastname,


    })

}

exports.updateclient = async (req, res, next) => {
    try { // il essaie de créer un client
        try { // il essaie de sauvegarder le nouveau client
            console.log(req.body);
            res.send(await Client.updateOne({ // je cherche à mettre à jours un seul élément mais il a besoin de l'id // on va récupérer l'élément selon l'id
                    _id: req.params.id // il recupère l'id de la requête 
                },
                req.body // je récupère donc la requête du body
            )) // on sauvegarde le client
        } catch (e) { // on gère l'erreur
            console.log(e);
        }
    } catch (e) {
        console.log(e);
    }
}

exports.deletedclient = async (req, res, next) => {
    res.send(await Client.deleteOne({ // supprime l'élément selectionné
        _id: req.params.id
    }))

    // try {
    //     clients.remove()

    // } catch (e) {
    //     console.log(e);
    // }

}