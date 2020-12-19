const newsCardLike = document.querySelectorAll('.news-card__like');

function handleLikeClick(likeBtn) {
  likeBtn.classList.toggle('news-card__like_active');
}

newsCardLike.forEach(element => {
  element.addEventListener('click', () => {
    handleLikeClick(element);
  })
});
