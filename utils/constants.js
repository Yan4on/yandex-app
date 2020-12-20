
const content = document.querySelector('.content');
export const subcategoryList = content.querySelectorAll('.card__menu-item');





// генерируем ключи, потом в них запишем значения стихов
const poems = {}

subcategoryList.forEach((item) => {
  poems[item.textContent] = '';
});

// тестовые примеры
poems['Подкатегория 1'] = '<p class="popup__text">Ведь где-то есть простая жизнь и свет,<br>Прозрачный, тёплый и весёлый...<br>Там с девушкой через забор сосед<br>Под вечер говорит, и слышат только пчёлы<br>Нежнейшую из всех бесед.</p>';

poems['Подкатегория 2'] = '<p class="popup__text">— А у нас в квартире газ!<br>А у вас?<br>— А у нас водопровод!<br>Вот!<br>— А из нашего окна<br>Площадь Красная видна!<br>А из вашего окошка<br>Только улица немножко.</p>';

// console.log(poems);

export { poems };
