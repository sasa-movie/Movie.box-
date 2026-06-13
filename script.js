<script>
   document.addEventListener('DOMContentLoaded', function () {
    
    // ==========================================
    // 1. КОД ДЛЯ РАБОТЫ ПОИСКА
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const movieCards = document.querySelectorAll('.movie-card');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            // Берем текст из поиска, убираем лишние пробелы и переводим в нижний регистр
            const filterText = searchInput.value.toLowerCase().trim();

            movieCards.forEach(function (card) {
                // Ищем заголовок внутри карточки
                const titleElement = card.querySelector('.movie-title');
                
                if (titleElement) {
                    const movieTitle = titleElement.textContent.toLowerCase();

                    // Проверяем: если название фильма содержит то, что ввел пользователь
                    if (movieTitle.includes(filterText)) {
                        card.style.display = ''; // Показываем карточку (очищаем display)
                    } else {
                        card.style.display = 'none'; // Скрываем карточку
                    }
                }
            });
        });
    } else {
        console.error("Поиск сломался: Инпут с id='search-input' не найден!");
    }


    // ==========================================
    // 2. КОД ДЛЯ БОКОВОГО МЕНЮ (Три полоски)
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }

    if (closeBtn && sidebar && overlay) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

});

 </script>
