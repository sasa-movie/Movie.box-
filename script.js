<script>
   document.addEventListener('DOMContentLoaded', function () {
    // Ждем, пока вся страница полностью загрузится
    
    const searchInput = document.getElementById('search-input');
    const movieCards = document.querySelectorAll('.movie-card'); // Убедитесь, что класс совпадает с вашим HTML

    // Проверяем, нашлось ли вообще поле поиска на странице
    if (!searchInput) {
        console.error("Ошибка: Поле поиска с id='search-input' не найдено в HTML!");
        return;
    }

    searchInput.addEventListener('input', function () {
        const filterText = searchInput.value.toLowerCase().trim();

        movieCards.forEach(function (card) {
            // Ищем заголовок внутри карточки (это может быть h2, h3 или h1)
            const titleElement = card.querySelector('h2') || card.querySelector('h3') || card.querySelector('h1');
            
            if (titleElement) {
                const movieTitle = titleElement.textContent.toLowerCase();

                if (movieTitle.includes(filterText)) {
                    card.style.display = ''; // Показываем карточку (возвращаем стандартный стиль)
                } else {
                    card.style.display = 'none'; // Скрываем карточку
                }
            }
        });
    });
});
 
  </script>
