var currentQuestion = 0;

socket.on('fromserver', message => {
    console.log(message);
});

socket.on('JoinResponse', message => {
    console.log(message.response);
});

socket.on('AnswerResponse', message => {
    console.log(message.response);
});

socket.on('QuizEnd', message => {
    console.log(message);
    currentQuestion = 0;
    document.getElementById("currQ").innerHTML = "QuestionNumber: 0";
});

socket.on('NewQuestion', message => {
    console.log(message);
    currentQuestion = message.QuestionNo;
    document.getElementById("currQ").innerHTML = "QuestionNumber: " + message.QuestionNo.toString();
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


function banana() {
    var pinCode = document.getElementById("pin-answer").value;
    var username = document.getElementById("username-answer").value;
    var answer = document.getElementById("answer-answer").value;

    socket.emit('Answer', {
        PIN: pinCode,
        Username: username,
        Answer: answer,
        QuestionNo: currentQuestion
    });
}


