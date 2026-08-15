// 1. Вставляем ваш бесплатный ключ и адрес TMDB API
const API_KEY = "9714615b02661885225a819fe106562e"; // Ваш ключ со скриншота
const API_URL = "https://themoviedb.org";

// 2. Находим элементы на странице
const searchInput = document.querySelector('.search-input') || document.querySelector('input[type="text"]');
const resultsContainer = document.getElementById('results-container') || document.body;

// 3. Функция поиска дорам (сериалов) на русском языке
async function searchDorama(query) {
    if (!query.trim()) return;

    try {
        // Делаем запрос к поиску сериалов TMDB (параметр language=ru-RU включает русский язык)
        const response = await fetch(`${API_URL}/search/tv?api_key=${API_KEY}&language=ru-RU&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Очищаем экран перед выводом новых результатов
        resultsContainer.innerHTML = ""; 

        const doramas = data.results;

        if (!doramas || doramas.length === 0) {
            resultsContainer.innerHTML = "<p style='color: white; padding: 20px;'>Ничего не найдено</p>";
            return;
        }

        // 4. Отрисовка полученных дорам
        doramas.forEach(dorama => {
            const card = document.createElement('div');
            // Стилизуем карточки, чтобы они красиво смотрелись на черном фоне
            card.style.cssText = "color: white; margin: 15px; padding: 10px; background: #1a1a1a; border-radius: 8px; display: inline-block; width: 180px; vertical-align: top; box-shadow: 0 4px 6px rgba(0,0,0,0.3);";
            
            // Если у сериала есть постер, формируем на него ссылку, иначе ставим заглушку
            const posterUrl = dorama.poster_path 
                ? `https://tmdb.org{dorama.poster_path}` 
                : 'https://placeholder.com';

            // Берем название (name) и дату первого выхода (first_air_date)
            const title = dorama.name || dorama.original_name;
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
    }
}

// 5. Отслеживаем нажатие клавиши Enter в поисковой строке
if (searchInput) {
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchDorama(searchInput.value);
        }
    });
}
