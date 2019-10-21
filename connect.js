socket.on('fromserver', message => {
    console.log(message);
});

socket.on('NewQuestion', message => {
    console.log(message);
});

function join() {
    var pinCode = document.getElementById("pin-input").value;
    var username = document.getElementById("username-input").value;

    socket.emit('Join', {
        PIN: pinCode,
        Username: username
    });
}

function quit() {
    var pinCode = document.getElementById("pin-input").value;
    var username = document.getElementById("username-input").value;

    socket.emit('Quit', {
        PIN: pinCode,
        Username: username
    });
}



