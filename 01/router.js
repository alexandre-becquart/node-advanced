const express = require('express')
const router = express.Router();
const fs = require('fs').promises;
const moment = require('moment');
const pageController = require('./controllers/page') // on fait appel aux methodes


//static files
router.use(express.static('public'))
router.get('/', pageController.index)
router.get('/about', pageController.about)
router.get('/clients', pageController.clients)
router.post('/clients', pageController.clientscreate)
router.get('/clients/:id', pageController.editclient)
router.patch('/clients/:id', pageController.updateclient)
router.delete('/clients/:id', pageController.deletedclient)
router.get('/client_form', pageController.clientform)
//error managememnt

router.use((req, res, next) => {
    res.status(404).render('pages/error', {
        title: 'Error page',

    })

})

module.exports = router;