<script>function filterMovies() {
    // Получаем текст, который ввел пользователь
    const input = document.getElementById('movieSearch');
    const filter = input.value.toLowerCase().trim();
    
    // Находим все карточки фильмов
    const cards = document.querySelectorAll('.movie-card');

    // Проверяем каждую карточку
    cards.forEach(card => {
        // Берем ВЕСЬ текст, который есть внутри этой карточки (название, описание, год)
        const cardText = card.innerText || card.textContent;
        
        // Если введенный текст есть в карточке, показываем её, иначе — прячем
        if (cardText.toLowerCase().includes(filter)) {
            card.style.display = ""; // Показываем блок (возвращаем к исходному CSS grid/flex)
        } else {
            card.style.display = "none"; // Прячем блок
        }
    });
}
    // 1. Находим на странице поле поиска и все карточки с фильмами
const searchInput = document.getElementById('search-input');
const movieCards = document.querySelectorAll('.movie-card'); // Замените .movie-card на ваш класс карточки

// 2. Слушаем, когда пользователь что-то пишет в инпут
searchInput.addEventListener('input', function () {
    // Переводим введенный текст в нижний регистр (чтобы "Охотники" и "охотники" работали одинаково)
    const filterText = searchInput.value.toLowerCase();

    // 3. Проходимся циклом по каждой карточке фильма на сайте
    movieCards.forEach(function (card) {
        // Находим заголовок внутри конкретной карточки (например, тег h2)
        const titleElement = card.querySelector('h2');
        
        if (titleElement) {
            // Берем текст названия и тоже переводим в нижний регистр
            const movieTitle = titleElement.textContent.toLowerCase();

            // 4. Проверяем, есть ли введенный текст в названии фильма
            if (movieTitle.includes(filterText)) {
                // Если есть — показываем карточку
                card.style.display = 'block'; 
            } else {
                // Если совпадений нет — скрываем карточку с экрана
                card.style.display = 'none'; 
            }
        }
    });
});
  </script>
