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
            })
        }

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
}

module.exports = gameRoutes;