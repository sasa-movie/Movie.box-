<script>
   document.addEventListener('DOMContentLoaded', function () {
    
    // --- ЗДЕСЬ ВАШ СТАРЫЙ КОД ПОИСКА ---
    // (Оставьте код поиска, который мы делали ранее, прямо тут)


    // --- ИСПРАВЛЕННЫЙ КОД ДЛЯ БОКОВОГО МЕНЮ ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // Проверяем в консоли, нашел ли скрипт кнопку
    if (!menuBtn) {
        console.error("Ошибка: Кнопка id='menu-btn' не найдена в HTML!");
    }

    if (menuBtn && sidebar && overlay) {
        // Открытие меню
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeBtn && sidebar && overlay) {
        // Закрытие на крестик
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay && sidebar) {
        // Закрытие при клике на темную область
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

   });


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
