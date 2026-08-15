// 1. Вставляем ваш бесплатный ключ и адрес TMDB API
const API_KEY = "9714615b026618852258a19fe106562e";
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w200";

// 2. Находим элементы на странице
const searchInput = document.querySelector('.search-input') || document.querySelector('input[type="text"]');
const resultsContainer = document.getElementById('results-container') || document.body;

// 3. Функция поиска дорам (сериалов) на русском языке
async function searchDorama(query) {
    if (!query.trim()) return;

    try {
        const response = await fetch(`${API_URL}/search/tv?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        resultsContainer.innerHTML = "";
        const doramas = data.results;

        if (!doramas || doramas.length === 0) {
            resultsContainer.innerHTML = "<p style='color: white; padding: 20px;'>Ничего не найдено</p>";
            return;
        }

        doramas.forEach(dorama => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.cssText = "color: white; margin: 15px; padding: 10px; background: #1a1a1a; border-radius: 8px; display: inline-block; width: 180px; vertical-align: top; box-shadow: 0 4px 6px rgba(0,0,0,0.3);";

            const posterUrl = dorama.poster_path
                ? `${IMAGE_URL}${dorama.poster_path}`
                : 'https://via.placeholder.com/200x300?text=Нет+постера';

            const title = dorama.name || dorama.original_name || 'Без названия';
            const year = dorama.first_air_date ? dorama.first_air_date.substring(0, 4) : '—';
            const rating = dorama.vote_average ? dorama.vote_average.toFixed(1) : '0';

            card.innerHTML = `
                <img src="${posterUrl}" alt="${title}" style="width: 100%; height: auto; border-radius: 4px; display: block;">
                <h3 style="margin: 8px 0 4px 0; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${title}</h3>
                <p style="margin: 0; font-size: 12px; color: #aaa;">Год: ${year} | ⭐ ${rating}</p>
            `;

            resultsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Ошибка при работе с TMDB API:", error);
        resultsContainer.innerHTML = "<p style='color: red; padding: 20px;'>Произошла ошибка при загрузке данных</p>";
    }
}

// 4. Отслеживаем нажатие клавиши Enter в поисковой строке
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchDorama(searchInput.value);
        }
    });
}
