const question = document.querySelector('#question');
const gameBoard = document.querySelector('#gameBoard');
const h2 = document.querySelector('h2');

function fillQuestionElements(data) {
    if(data.winner === true) {
        gameBoard.style.display='none';
        h2.innerText = "WYGRAŁEŚ!";
        return;
    }

    if(data.loser === true) {
        gameBoard.style.display='none';
        h2.innerText = "PRZEGRAŁEŚ!";
        return;
    }

    question.innerText = data.question;
    
    for(const i in data.answers) {
        const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
        answerEl.innerText = data.answers[i];
    }
}

function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        fillQuestionElements(data);
    });
}

showNextQuestion();
const goodAnswersSpan = document.querySelector('#good-answers');

function handleAnswerFeedback(data){
    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        handleAnswerFeedback(data);
    });
}

const buttons = document.querySelectorAll('answer-btn');
for(const button of buttons) {
    button.addEventListener('click', function() {
        const answerIndex = this.dataset.answer;
        sendAnswer(answerIndex);
    });
}

function callToAFriend() {
        fetch('/help/friend', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
    }

    document.querySelector('#callToAFriend').addEventListener('click', callToAFriend);