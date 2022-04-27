function gameRoutes(app) {
let goodAnswers = 0;
let isGameOver = false; 
let callToAFriendUsed = false;
let questionToTheCrowdUsed = false;
let halfOnHalfUsed = false;

const questions = [
    {
        question: 'Jaki jest najlepszy język programowania',
        answers: ['C++', 'Java', 'Python', 'JavaScript'],
        correctAnswer: 3,
    },
    {
        question: 'Jaka jest najlepsza technologia frontendowa?',
        answers: ['React', 'Angular', 'Svelte', 'Vue'],
        correctAnswer: 0,
    },
    {
        question: 'Jaka jest najlepsza baza danych',
        answers: ['SQL', 'MySQL', 'MongoDB', 'FirebaseDB'],
        correctAnswer: 2,
    },
    {
        question: 'Która liczba jest największa?',
        answers: ['Jeden', 'Osiem', 'Szesc', 'Dwa'],
        correctAnswer: 1,
    },
];

    app.get('/question', (req, res) => {
        if(goodAnswers === questions.length) {
            res.json({
                winner: true,
            });
        } else if (isGameOver){
            res.json({
                loser: true,
            });
        } else {
            const nextQuestion = questions[goodAnswers];
            const { question, answers } = nextQuestion;

            res.json({
                question, answers,
            });
        };
    });

    app.post('/answer/:index', (req, res) => {
        if(isGameOver) {
            res.json({
                loser: true
            });
        };
        const { index } = req.params;
        const question = questions[goodAnswers];
        const isGoodAnswer = question.correctAnswer === Number(index);

        if (isGoodAnswer) {
            goodAnswers++
        } else {
            isGameOver = true
        }
            res.json({
                correct: isGoodAnswer,
                goodAnswers,
            });
    });

    app.get('/help/friend', (req, res) => {
        if(callToAFriendUsed) {
            return res.json({
                text: 'To koło ratunkowe zostało już wykorzystane',
            });
        }
        callToAFriendUsed = true;
        const doesFriendKnowAnswer = Math.random() < 0.5;
        const question = questions[goodAnswers];
        res.json({
            text: doesFriendKnowAnswer ? `Wydaje mi się że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Hmm ... no nie wiem ...',
        });
    });

    app.get('/help/halfonhalf', (req, res) => {
        if(halfOnHalfUsed) {
            return res.json({
                text: 'To koło ratunkowe zostało już wykorzystane',
            });
        }
        
        halfOnHalfUsed = true;
        const question = questions[goodAnswers];
        const answersCopy = question.answers.filter((s, index) => (
            index !== question.correctAnswer
        ));
        answersCopy.splice(Math.floor(Math.random() * answersCopy.length), 1);

        res.json({
            answersToRemove: answersCopy,
        });
    });
}

module.exports = gameRoutes;