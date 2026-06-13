<script>
   document.addEventListener('DOMContentLoaded', function () {
    // 1. Находим поле поиска по его ID
    const searchInput = document.getElementById('search-input');
    // 2. Находим все карточки фильмов на странице
    const movieCards = document.querySelectorAll('.movie-card');

    // Проверка на случай, если забыли добавить id="search-input" в HTML
    if (!searchInput) {
        console.error("Ошибка: Не найден элемент с id='search-input'. Проверьте ваш HTML!");
        return;
    }

    // 3. Отслеживаем каждый ввод символа в поле поиска
    searchInput.addEventListener('input', function () {
        // Берем текст, который ввел пользователь, и переводим в нижний регистр
        const filterText = searchInput.value.toLowerCase().trim();

        // 4. Проходимся по всем карточкам фильмов
        movieCards.forEach(function (card) {
            // Ищем внутри карточки заголовок с классом .movie-title
            const titleElement = card.querySelector('.movie-title');
            
            if (titleElement) {
                // Получаем название фильма (например, "Крминальный город 1") в нижнем регистре
                const movieTitle = titleElement.textContent.toLowerCase();

                // 5. Проверяем, совпадает ли текст поиска с названием фильма
                if (movieTitle.includes(filterText)) {
                    card.style.display = ''; // Показываем фильм, если совпало
                } else {
                    card.style.display = 'none'; // Скрываем фильм, если не совпало
                }
            }
        });
    });
});
 </script
