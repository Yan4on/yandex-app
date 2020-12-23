import FormValidator from '../components/FormValidator.js';
import { poems } from  './constants.js';



// ---ДАННЫЕ ---
const content = document.querySelector(".content");
const subcategoryList = content.querySelectorAll(".card__menu-item");


const popupWithForm = document.querySelector(".popup_type_form");
const popupForm = popupWithForm.querySelector(".popup__form");
const popupInputCat = popupWithForm.querySelector("#category");
const popupWithBlank = document.querySelector(".popup_type_blank");
const popupSendBlank = document.querySelector(".popup__send-btn");
const inputList = popupForm.querySelectorAll(".popup__input");

//объект параметров для валидации форм
const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  customMesseges:{
    phoneNumber: 'Введите телефон в формате +7 999 999 99 99'
  },
};


const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");
const newsCardLike = document.querySelectorAll(".news-card__like");
const quizPopup = document.querySelector(".popup__quiz");
const buttonTestQuiz = document.querySelector(".quiz__button_test");


// ИнфоПопап
// const popupInfobutton = document.querySelector(".popup__info-button");
// const popupInfo = document.querySelector(".popup__info");
// popupInfobutton.addEventListener("click", closePopup);



//Класс, который представляет сам тест

class Quiz {
  constructor(questions, onSuccess = null) {
    //Массив с вопросами
    this.questions = questions;

    //Номер текущего вопроса
    this.current = 0;

    this.onSuccess = onSuccess;
  }

  checkAnswer(index) {
    return this.questions[this.current].answers[index].value == 1;
  }

  getQuestion() {
    const id = parseInt(Math.random() * this.questions.length);
    this.current = id;
    return this.questions[id];
  }
  result(func) {
    this.onSuccess = func;
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}





// --- ФУНКЦИИ ---
function openPopup(typePopup) {
  typePopup.classList.add("popup_opened");
}

function closePopup(typePopup) {
  if (typePopup === popupForm.closest('.popup')) {
    popupForm.reset();
  }
  typePopup.classList.remove("popup_opened");
}

function handlePopupClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function fillBlank({
    popupSurname,
    popupName,
    popupEmail,
    popupTel,
    popupCategory
  },
  dataPoems
) {
  popupWithBlank.querySelector(
    ".popup__name"
  ).textContent = `${popupSurname} ${popupName}`;
  popupWithBlank.querySelector(
    ".popup__email"
  ).textContent = `e-mail: ${popupEmail}`;
  popupWithBlank.querySelector(
    ".popup__tel"
  ).textContent = `тел.: ${popupTel}`;
  popupWithBlank.querySelector(
    ".popup__category"
  ).textContent = `Вид услуги: ${popupCategory}`;
  popupWithBlank.querySelector(".popup__text").innerHTML =
    dataPoems[popupCategory];
}

function handlePopupSubmit(evt) {
  evt.preventDefault();
  const formValues = {};

  inputList.forEach((input) => {
    formValues[input.name] = input.value;
  });

  fillBlank(formValues, poems);
  closePopup(popupWithForm);

  Update();
  quiz.result(() => openPopup(popupWithBlank));
  openQuiz();
}

function openQuiz(onResult) {
  quizPopup.classList.add("popup__quiz_opened");
}

function closeQuiz() {
  quizPopup.classList.remove("popup__quiz_opened");
}

// function handleQuizClick(evt) {
//   if (evt.target.classList.contains("popup")) {
//     closeQuiz();
//   }
// }

function handleLikeClick(likeBtn) {
  likeBtn.classList.toggle("news-card__like_active");
}

function Update() {
  //Проверяем, есть ли ещё вопросы
  //Если есть, меняем вопрос в заголовке
  const question = quiz.getQuestion();
  headElem.innerHTML = question.text;

  //Удаляем старые варианты ответов
  buttonsElem.innerHTML = "";

  //Создаём кнопки для новых вариантов ответов
  for (let i = 0; i < question.answers.length; i++) {
    let btn = document.createElement("button");
    btn.className = "button";

    btn.innerHTML = question.answers[i].text;

    btn.setAttribute("index", i);

    buttonsElem.appendChild(btn);
  }

  //Находим все кнопки
  let btns = document.getElementsByClassName("button");

  for (let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    //При нажатии на кнопку будет вызываться функция Click()
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}



function Click(index) {
  //Получаем номер правильного ответа
  let correct = quiz.checkAnswer(index);
  closeQuiz();
  if (correct) {
    quiz.onSuccess();
  }
  else {
   alert('Вы ответили не верно')
  }
}



// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
subcategoryList.forEach((element) => {
  element.addEventListener("click", () => {
    openPopup(popupWithForm);
    validFormPopupUser.resetValidationState();
    popupInputCat.value = element.textContent;
  });
});

document.querySelectorAll(".popup__close").forEach((element) => {
  element.addEventListener("click", () => {
    closePopup(element.closest(".popup"));
  });
});

popupWithForm.addEventListener("mousedown", handlePopupClick);

popupForm.addEventListener("submit", handlePopupSubmit);

popupSendBlank.addEventListener("click", () => {
  closePopup(popupWithBlank);
});

newsCardLike.forEach((element) => {
  element.addEventListener("click", () => {
    handleLikeClick(element);
  });
});


// --- ДЕЙСТВИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ  ---

const validFormPopupUser = new FormValidator(validationObject, ".popup_type_form");
validFormPopupUser.enableValidation();



const questions = [
  new Question(
    `Буря мглою небо кроет,
    Вихри снежные крутя.
    То, как зверь, она завоет,
    То заплачет, как дитя...`,
    [
      new Answer("Тютчев Ф.И", 0),
      new Answer("Lana del rey", 0),
      new Answer("Пушкин А.С", 1),
      new Answer("Есенин С.А", 0),
    ]
  ),

  new Question(
    `Люблю грозу в начале мая,
    Когда весенний, первый гром,
    как бы резвяся и играя,
    Грохочет в небе голубом...`,
    [
      new Answer("Лермонтов М.Ю", 0),
      new Answer("Пушкин А.С", 0),
      new Answer("Тютчев Ф.И", 1),
      new Answer("Feduk", 0),
    ]
  ),

  new Question(
    `Белеет парус одинокой
    В тумане моря голубом!..
    Что ищет он в стране далекой?
    Что кинул он в краю родном?..`,
    [
      new Answer("Ксения Собчак", 0),
      new Answer("Тютчев Ф.И", 0),
      new Answer("Пушкин А.С", 0),
      new Answer("Лермонтов М.Ю", 1),
    ]
  ),

  new Question(
    `Белая берёза
    Под моим окном
    Принакрылась снегом,
    Точно серебром...`,
    [
      new Answer("Тютчев Ф.И", 0),
      new Answer("Есенин С.А", 1),
      new Answer("Навальный А.", 0),
      new Answer("Пушкин А.С", 0),
    ]
  ),

  new Question(
    `Ночь, улица, фонарь, аптека,
    Бессмысленный и тусклый свет.
    Живи еще хоть четверть века —
    Все будет так. Исхода нет...`,
    [
      new Answer("Скриптонит", 0),
      new Answer("Тютчев Ф.И", 0),
      new Answer("Есенин С.А", 0),
      new Answer("Блок А.А", 1),
    ]
  ),

  new Question(
    `Я достаю из широких штанин
    дубликатом бесценного груза. Читайте, завидуйте,
    я — гражданин Советского Союза. `,
    [
      new Answer("ЭлДжей", 0),
      new Answer("Emenem", 0),
      new Answer("Маяковский В.В", 1),
      new Answer("Блок", 0),
    ]
  ),
];


const quiz = new Quiz(questions);
