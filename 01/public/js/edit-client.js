let edit = document.getElementById('update')
form.addEventListener('submit', function (event) {
    event.preventDefault(); // on annule l'effet de base de submit
    let sendJson = { // on récupère les éléments du formulaire
        firstname: this.firstname.value,
        lastname: this.lastname.value
    }

    fetch("http://localhost:8010/clients", {
        method: 'Patch',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sendJson)

    }).then((response) => {
        window.location.replace("http://localhost:8010/clients") // à la fin du formulaire, il renvoie vers la page client
    })

});