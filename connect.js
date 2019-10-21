function myFunction() {
    var firstName = document.getElementById("firstname-input").value;
    var lastName = document.getElementById("lastname-input").value;

    socket.on('fromserver', message => {
        console.log(message);
    });

    socket.emit('data', {
        firstName: firstName,
        lastName: lastName
    });
}



