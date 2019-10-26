var currentQuestion = 0;
var pinCode;
var username;
var iframe = document.getElementById('bodyframe');
var iframeDocument
iframe.addEventListener("load", function() {
    iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
});

socket.on('fromserver', message => {
    console.log(message);
});

socket.on('JoinResponse', message => {
    if(message.flag == 0) {
        console.log(message.response);
        iframeDocument.getElementById("pin-input").value = "";
        iframeDocument.getElementById("login-error").innerHTML = "Incorrect PIN";
    }
    else if(message.flag == 1) {
        console.log(message.response);
        iframeDocument.getElementById("username-input").value = "";
        iframeDocument.getElementById("login-error").innerHTML = "Username already in use";
    }
    else if(message.flag == 2) {
        $('#bodyframe').attr('src','lobby.html');
    }
});

socket.on('AnswerResponse', message => {
    console.log(message.response);
});


socket.on('NewQuestion', message => {
    console.log(message);
    currentQuestion = message.QuestionNo;
    const timeStart = message.TimeStart;
    const timeStop = message.TimeStop;
    const timeNow = Date.now();

    setTimeout(function(){
        $('#bodyframe').attr('src','question.html');
        iframe.addEventListener("load", function() {
            iframeDocument.getElementById("currQ").innerHTML = "Question " + (message.QuestionNo + 1).toString();
            iframeDocument.getElementById("answer-button-1").disabled = false;
            iframeDocument.getElementById("answer-button-2").disabled = false;
            iframeDocument.getElementById("answer-button-3").disabled = false;
            iframeDocument.getElementById("answer-button-4").disabled = false;
        });
        }, (timeStart-timeNow));

    setTimeout(function(){
        iframeDocument.getElementById("answer-button-1").disabled = true;
        iframeDocument.getElementById("answer-button-2").disabled = true;
        iframeDocument.getElementById("answer-button-3").disabled = true;
        iframeDocument.getElementById("answer-button-4").disabled = true;
    }, (timeStop-timeNow));
});

socket.on('QuizEnd', message => {
    console.log(message);
    currentQuestion = 0;
    $('#bodyframe').attr('src','lobby.html');
});

socket.on('LobbyEnd', message => {
    console.log(message);
    currentQuestion = 0;
    window.location.href = "main.html";
});

function join() {
    pinCode = iframeDocument.getElementById("pin-input").value;
    username = iframeDocument.getElementById("username-input").value;

    socket.emit('Join', {
        PIN: pinCode,
        Username: username
    });
}

function quit() {
    socket.emit('Quit', {
        PIN: pinCode,
        Username: username
    });
    window.location.href = "main.html";
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


function answer(id) {

    iframeDocument.getElementById("answer-button-1").disabled = true;
    iframeDocument.getElementById("answer-button-2").disabled = true;
    iframeDocument.getElementById("answer-button-3").disabled = true;
    iframeDocument.getElementById("answer-button-4").disabled = true;

    socket.emit('Answer', {
        PIN: pinCode,
        Username: username,
        Answer: id,
        QuestionNo: currentQuestion
    });
}