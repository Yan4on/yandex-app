
const content = document.querySelector('.content');
export const subcategoryList = content.querySelectorAll('.card__menu-item');





// генерируем ключи, потом в них запишем значения стихов
const poems = {}

subcategoryList.forEach((item) => {
  poems[item.textContent] = '';
});

console.log(poems);
