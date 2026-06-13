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
  </script>
