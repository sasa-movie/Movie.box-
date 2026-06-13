<script>
   document.addEventListener('DOMContentLoaded', function () {
          // Логика для бокового меню
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // Открываем меню по клику на ☰
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    // Закрываем меню по клику на крестик ×
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Закрываем меню, если кликнули на темный фон вне меню
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

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
