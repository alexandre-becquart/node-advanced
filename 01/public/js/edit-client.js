let edit = document.getElementById('update')
edit.addEventListener('submit', function (event) {
    event.preventDefault(); // on annule l'effet de base de submit
    let sendJson = { // on récupère les éléments du formulaire // 
        firstname: this.firstname.value,
        lastname: this.lastname.value
    }
    let id = this.id.value; // faire la bonne requete avec la bonne route avec l'id
    console.log("HEY");
    fetch(`http://localhost:8010/clients/${id}`, { // il a besoin d'un id 
        method: 'PATCH', // methode patch pour mettre à jour partiellement l'élément
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(sendJson) // je convertie mon sendjson en fichier Json et il devient mon paramètre body

    }).then((response) => {
        window.location.replace("http://localhost:8010/clients") // à la fin du formulaire, il renvoie vers la page client
    })

});