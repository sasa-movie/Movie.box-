// 1. API ключ и адреса
const API_KEY = "9714615b026618852258a19fe106562e";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w200";

// 2. Находим элементы
const searchInput = document.getElementById('search-input');
const resultsContainer = document.querySelector('.movies-grid');

// 3. Функция поиска (для сериалов/дорам)
async function searchDorama(query) {
    if (!query.trim()) return;

    try {
        // Запрос к поиску сериалов (TV)
        const response = await fetch(`${API_URL}/search/tv?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Очищаем контейнер
        resultsContainer.innerHTML = "";

        const doramas = data.results;

        if (!doramas || doramas.length === 0) {
            resultsContainer.innerHTML = `<p style="color: white; padding: 20px;">Ничего не найдено</p>`;
            return;
        }

        // Отображаем каждую дораму
        doramas.forEach(dorama => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            // Формируем URL постера
            const posterUrl = dorama.poster_path
                ? `${IMAGE_URL}${dorama.poster_path}`
                : 'https://via.placeholder.com/200x300?text=Нет+постера';

            // Для сериалов используем name и first_air_date
            const title = dorama.name || dorama.original_name || 'Без названия';
            const year = dorama.first_air_date ? dorama.first_air_date.substring(0, 4) : '—';
            const rating = dorama.vote_average ? dorama.vote_average.toFixed(1) : '0';
            const overview = dorama.overview || 'Описание отсутствует';

            // Собираем карточку
            card.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; color: white; padding: 10px; background: #1a1a1a; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
                    <img src="${posterUrl}" alt="${title}" style="width: 100%; max-width: 200px; border-radius: 8px;">
                    <h3 style="margin: 8px 0 4px; font-size: 16px;">${title}</h3>
                    <p style="margin: 0; font-size: 14px; color: #aaa;">Год: ${year} | ⭐ ${rating}</p>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #888; text-align: center;">${overview.substring(0, 120)}...</p>
                </div>
            `;

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка при запросе к TMDB:", error);
        resultsContainer.innerHTML = `<p style="color: red; padding: 20px;">Произошла ошибка загрузки данных</p>`;
    }
}

// 4. Обработчик нажатия Enter в поле поиска
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchDorama(searchInput.value);
        }
    });
}
