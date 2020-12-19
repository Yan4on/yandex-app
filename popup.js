
import { subcategoryList, poems } from './utils/constants.js';

const popupWithForm = document.querySelector('.popup_type_form');
const popupForm =popupWithForm.querySelector('.popup__form');
const inputList = popupForm.querySelectorAll('.popup__input');
const popupInputCat = popupWithForm.querySelector('#category');


const popupWithBlank = document.querySelector('.popup_type_blank');
const popupSendBlank = document.querySelector('.popup__send-btn');


// --- ФУНКЦИИ ---
function openPopup(typePopup) {
  typePopup.classList.add('popup_opened');
}

function closePopup(typePopup) {
  typePopup.classList.remove('popup_opened');
}

function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}


// функция заполнения бланка
function fillBlank({
  popupSurname,
  popupName,
  popupEmail,
  popupTel,
  popupCategory
 }, dataPoems) {
  popupWithBlank.querySelector('.popup__name').textContent = `${popupSurname} ${popupName}`;
  popupWithBlank.querySelector('.popup__email').textContent = `e-mail: ${popupEmail}`;
  popupWithBlank.querySelector('.popup__tel').textContent = `тел.: ${popupTel}`;
  popupWithBlank.querySelector('.popup__category').textContent = `Вид услуги: ${popupCategory}`;
  popupWithBlank.querySelector('.popup__text').innerHTML = dataPoems[popupCategory];

}


function handlePopupSubmit(evt) {
  evt.preventDefault();
  const formValues = {};

  inputList.forEach((input) => {
    formValues[input.name] = input.value;
  });

  fillBlank(formValues, poems);

  closePopup(popupWithForm);
  openPopup(popupWithBlank);
}



// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
subcategoryList.forEach(element => {
  element.addEventListener('click', () => {
    openPopup(popupWithForm);
    popupInputCat.value = element.textContent;
  });
});


document.querySelectorAll('.popup__close').forEach(element =>{
  element.addEventListener('click', () => {
    closePopup(element.closest('.popup'))
  });
})


popupWithForm.addEventListener('mousedown', handlePopupClick);

popupForm.addEventListener("submit", handlePopupSubmit);

popupSendBlank.addEventListener("click", () => {
  closePopup(popupWithBlank);
});


