const questions = [
    {
        question: 'Какой язык работает в браузере?',
        answers: ['Java', 'C', 'Python', 'JavaScript'],
        correct: 4,
    },
    {
        question: 'Что означает CSS?',
        answers: [
            'Central Style Sheets',
            'Cascading Style Sheets',
            'Cascading Simple Sheets',
            'Cars SUVs Sailboats',
        ],
        correct: 2,
    },
    {
        question: 'Что означает HTML?',
        answers: [
            'Hypertext Markup Language',
            'Hypertext Markdown Language',
            'Hyperloop Machine Language',
            'Helicopters Terminals Motorboats Lamborginis',
        ],
        correct: 1,
    },
    {
        question: 'В каком году был создан JavaScript?',
        answers: ['1996', '1995', '1994', 'все ответы неверные'],
        correct: 2,
    },
];

// Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные
let score = 0; // количество правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    // Подставляем вопрос:
    const headerTemplate = `<h2 class='title'>%title%</h2>`;
    const title = headerTemplate.replace(
        '%title%',
        questions[questionIndex]['question']
    );
    headerContainer.innerHTML = title;

    // Варианты ответов:
    for ([index, answerText] of questions[questionIndex]['answers'].entries()) {
        const questionTemplate = `<li>
				<label>
					<input type="radio" value="%number%" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

        const answerHTML = questionTemplate
            .replace('%answer%', answerText)
            .replace('%number%', index);
        listContainer.innerHTML += answerHTML;
    }
}

function checkAnswer() {
    // Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector(
        'input[type="radio"]:checked'
    );

    if (!checkedRadio) {
        submitBtn.blur();
        return;
    }
    // Получаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value);
    console.log(userAnswer);

    // Проверка верный ли ответ
    if (userAnswer + 1 === questions[questionIndex]['correct']) {
        score++;
    }
    if (questionIndex !== questions.length - 1) {
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    const resultsTemplate = `<h2 class="title">%title%</h2>
 <h3 class="summary">%message%</h3>
<p class="result">%result%</p>
`;
    let title, message;

    if (score === questions.length) {
        title = 'Congratulations';
        message = 'Exelent';
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Not bad';
        message = '50% result';
    } else {
        title = 'bad result';
        message = 'try once more ';
    }

    let result = `${score} from ${questions.length}`;

    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result);

    headerContainer.innerHTML = finalMessage;

    submitBtn.blur();
    submitBtn.innerText = 'Try again';
    submitBtn.onclick = () => history.go();
}
