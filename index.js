$(document).ready(function(){
    // Se selecciona el elemento con el id 'menu'
    var $nav = $('#menu');
    // Se inicializa la variable 'previousScroll' en 0
    var previousScroll = 0;
    // Se agrega un evento de scroll a la ventana
    $(window).scroll(function(event){
       // Se obtiene la posición actual del scroll
       var scroll = $(this).scrollTop();
       // Si la posición actual del scroll es mayor a 200px, se agrega la clase 'bgcolor' al elemento seleccionado
       if (scroll > 200){
           $nav.addClass('bgcolor');
       } 
       // Si la posición actual del scroll es menor o igual a 200px, se remueve la clase 'bgcolor' del elemento seleccionado
       else {
           $nav.removeClass('bgcolor');
       }
       // Se actualiza la variable 'previousScroll' con la posición actual del scroll
       previousScroll = scroll;    
    }); 
});



function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}

window.handleCredentialResponse = (response) => {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    console.log("TODO: " + responsePayload);

    document.getElementById('saludar').innerHTML = 'Bienvenido(a): ' + responsePayload.name;
}

function signOut() {
    var auth2 = gapi.client.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}