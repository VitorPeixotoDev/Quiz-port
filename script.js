const questions = [
    {
        question: 'Quem escreveu "Cem Anos de Solidão"?',
        answers: [
            { text: 'Paulo Coelho', correct: false },
            { text: 'Clarice Lispector', correct: false },
            { text: 'Gabriel García Márquez', correct: true },
            { text: 'Machado de Assis', correct: false },
        ]
    },
    {
        question: 'Qual desses autores já ganhou o Prêmio Nobel de Literatura"?',
        answers: [
            { text: 'Paulo Coelho', correct: false },
            { text: 'Machado de Assis', correct: false },
            { text: 'Leon Tolstoi', correct: false },
            { text: 'Hermann Hesse', correct: true },
        ]
    },
    {
        question: 'Quem escreveu o conto "Tlön, Uqbar, Orbis Tertius"?',
        answers: [
            { text: 'Paulo Coelho', correct: false },
            { text: 'Jorge Luis Borges', correct: true },
            { text: 'Julio Cortázar', correct: false },
            { text: 'Gabriela Mistral', correct: false },
        ]
    },
    {
        question: 'Qual desses autores ou autoras jamais ganhou o Prêmio Nobel de Literatura"?',
        answers: [
            { text: 'Paulo Coelho', correct: true },
            { text: 'Nadine Gordimer', correct: false },
            { text: 'Elfriede Jelinek', correct: false },
            { text: 'Elias Canetti', correct: false },
        ]
    },
    {
        question: "Qual é o autor do livro 'O Grande Gatsby'?",
        answers: [
        { text: "Ernest Hemingway", correct: false },
        { text: "F. Scott Fitzgerald",correct: true },
        { text: "William Faulkner", correct: false },
        { text: "John Steinbeck", correct: false }
        ]
    },
    {
        question: "Qual foi o primeiro livro publicado por Machado de Assis?",
        answers: [
          { text: "Memórias Póstumas de Brás Cubas", correct: false },
          { text: "Ressurreição", correct: true },
          { text: "Quincas Borba", correct: false },
          { text: "Dom Casmurro", correct: false },
        ]
    }    
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

const startQuiz = () => {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'próxima'
    showQuestion()
}

const showQuestion = () => {
    reseteState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

const reseteState = () => {
    nextButton.style.display = 'none'
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

const selectAnswer = event => {
    const selectedBtn = event.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display = 'block'
}

const showScore = () => {
    reseteState()
    questionElement.innerHTML = `Você acertou ${score} das ${questions.length} perguntas!`
    nextButton.innerHTML = 'jogar novamente'
    nextButton.style.display = 'block'
}

const handleNextButton = () => {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()