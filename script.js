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

</script>
