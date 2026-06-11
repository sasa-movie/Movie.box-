const fs = require('fs');

// Используем стабильное, открытое зеркало базы TMDB, которое не блокирует роботов GitHub
const apiUrl = "https://api.themoviedb.org/3/trending/tv/day?api_key=b96c09bc1fb7b02db725a74ffef637f7&language=ru-RU";

console.log("Запуск надежного обновления каталога дорам через TMDB...");

fetch(apiUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('Ошибка базы данных: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!data || !data.results) throw new Error('База вернула пустой ответ');

        // Отбираем только азиатские страны (Корея, Китай, Япония)
        const asianShows = data.results.filter(function(item) {
            if (!item.origin_country || item.origin_country.length === 0) return false;
            var countryCode = item.origin_country[0];
            return countryCode === 'KR' ||   countryCode === 'CN' ||  countryCode === 'JP';
        });

        // Превращаем данные в понятный для твоего сайта формат карточек
        const newDramas = asianShows.map(function(item, index) {
            var country = "Южная Корея";
            if (item.origin_country[0] === 'CN') country = "Китай";
            if (item.origin_country[0] === 'JP') country = "Япония";

            var genre = "Романтика";
            if (item.genre_ids && item.genre_ids.length > 0) {
                var gId = item.genre_ids[0];
                if (gId === 10759 || gId === 9648) genre = "Экшен";
                if (gId === 14 || gId === 878) genre = "Фэнтези";
            }

            // Вечные, красивые постеры высокого разрешения
            var poster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500";
            if (item.poster_path) {
                poster = "https://image.tmdb.org/t/p/w500" + item.poster_path;
            }

            return {
                id: index + 1,
                kp_id: item.id.toString(), // ID для плеера
                title: item.name || item.original_name,
                year: item.first_air_date ? item.first_air_date.substring(0, 4) : "2026",
                country: country,
                genre: genre,
                poster: poster
            };
        });

        if (newDramas.length === 0) {
            console.log("В сегодняшних трендах Азии нет новинок. База остается прежней.");
            return;
        }

        // Сохраняем готовый список в файл dramas-data.js
        const fileContent = "window.remoteDramas = " + JSON.stringify(newDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Успешно добавлено " + newDramas.length + " актуальных дорам в dramas-data.js!");
    })
    .catch(function(err) {
        console.error("Ошибка при работе робота:", err);
        process.exit(1);
    });
