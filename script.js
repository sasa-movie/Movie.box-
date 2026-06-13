<script>
   document.addEventListener('DOMContentLoaded', function () {
    console.log("Скрипт Movie Box успешно запущен!");

    // ==========================================
    // 1. УНИВЕРСАЛЬНЫЙ ПОИСК
    // ==========================================
    const searchInput = document.getElementById('search-input');
    const movieCards = document.querySelectorAll('.movie-card');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const filterText = searchInput.value.toLowerCase().trim();

            movieCards.forEach(function (card) {
                // Ищем заголовок (поддерживает и обычный h2, и класс movie-title)
                const titleElement = card.querySelector('.movie-title') || card.querySelector('h2');
                
                if (titleElement) {
                    const movieTitle = titleElement.textContent.toLowerCase();

                    // Если текст из поиска есть в названии фильма — показываем, если нет — скрываем
                    if (movieTitle.includes(filterText)) {
                        card.style.display = ''; 
                    } else {
                        card.style.display = 'none'; 
                    }
                }
            });
        });
    }

    // ==========================================
    // 2. БОКОВОЕ МЕНЮ (Три полоски)
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
