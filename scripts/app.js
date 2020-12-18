import Quiz from '../components/Quiz.js'
import Question from '../components/Question.js'
import Answer from '../components/Answer.js'
import Result from '../components/Result.js'

const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Массив с результатами
const results = 
[
	new Result("Тест не пройден", 0),
	new Result("Тест не пройден", 2),
	new Result("Тест пройден", 4),
	new Result("Тест пройден", 6)
];

//Массив с вопросами
const questions = 
[
	new Question(`Буря мглою небо кроет,
	Вихри снежные крутя.
	То, как зверь, она завоет,
	То заплачет, как дитя...`, 
	[
		new Answer("Тютчев Ф.И", 0),
		new Answer("Lana del rey", 0),
		new Answer("Пушкин А.С", 1),
		new Answer("Есенин С.А", 0)
	]),

	new Question(`Люблю грозу в начале мая,
	Когда весенний, первый гром,
	как бы резвяся и играя,
	Грохочет в небе голубом...`, 
	[
		new Answer("Лермонтов М.Ю", 0),
		new Answer("Пушкин А.С", 0),
		new Answer("Тютчев Ф.И", 1),
		new Answer("Feduk", 0)
	]),

	new Question(`Белеет парус одинокой
	В тумане моря голубом!..
	Что ищет он в стране далекой?
	Что кинул он в краю родном?..`, 
	[
		new Answer("Ксения Собчак", 0),
		new Answer("Тютчев Ф.И", 0),
		new Answer("Пушкин А.С", 0),
		new Answer("Лермонтов М.Ю", 1)
	]),

	new Question(`Белая берёза
	Под моим окном
	Принакрылась снегом,
	Точно серебром...`, 
	[
		new Answer("Тютчев Ф.И", 0),
		new Answer("Есенин С.А", 1),
		new Answer("Навальный А.", 0),
		new Answer("Пушкин А.С", 0)
	]),

	new Question(`Ночь, улица, фонарь, аптека,
	Бессмысленный и тусклый свет.
	Живи еще хоть четверть века —
	Все будет так. Исхода нет...`, 
	[
		new Answer("Скриптонит", 0),
		new Answer("Тютчев Ф.И", 0),
		new Answer("Есенин С.А", 0),
		new Answer("Блок А.А", 1)
	]),

	new Question(`Я достаю из широких штанин 
	дубликатом бесценного груза. Читайте, завидуйте, 
	я — гражданин Советского Союза. `, 
	[
		new Answer("ЭлДжей", 0),
		new Answer("Emenem", 0),
		new Answer("Маяковский В.В", 1),
		new Answer("Блок", 0)
	])
];

//Сам тест
const quiz = new Quiz(0, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}