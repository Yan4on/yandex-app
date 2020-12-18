
const content = document.querySelector('.content');
const subcategoryList = content.querySelectorAll('.card__menu-item');

const popupWithForm = document.querySelector('.popup');
const popupCloseBtn = popupWithForm.querySelector('.popup__close');





// --- ФУНКЦИИ ---
function openPopup() {
  popupWithForm.classList.add('popup_opened');
}

function closePopup() {
  popupWithForm.classList.remove('popup_opened');
}

function handlePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}





// --- ОБРАБОТЧИКИ СОБЫТИЙ ---
subcategoryList.forEach(element => {
  element.addEventListener('click', openPopup);
});

popupCloseBtn.addEventListener('click', closePopup);

popupWithForm.addEventListener('mousedown', handlePopupClick);





