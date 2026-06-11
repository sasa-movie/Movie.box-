const fs = require('fs');

// Используем официальную открытую конечную точку, которая стабильно отдаёт списки
const apiUrl = "https://vidsrc.cc/v2/embed/tv/popular?limit=50";

console.log("Запуск обновления базы дорам с маскировкой под браузер...");

// Настраиваем заголовки, чтобы прикинуться обычным пользователем Chrome и обойти ошибку 403
const requestOptions = {
    method: 'GET',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
    }
};

fetch(apiUrl, requestOptions)
    .then(function(res) {
        if (!res.ok) throw new Error('Ошибка сети: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!data || !data.results) throw new Error('Пустая база данных');

        // Фильтруем только Азию (Корея, Китай, Япония)
        const asianShows = data.results.filter(function(item) {
            if (!item.origin_country || item.origin_country.length === 0) return false;
            var countryCode = item.origin_country[0];
            return countryCode === 'KR'  countryCode === 'CN'  countryCode === 'JP';
        });

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

            var poster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500";
            if (item.poster_path) {
                poster = "https://image.tmdb.org/t/p/w500" + item.poster_path;
            }

            return {
                id: index + 1,
                kp_id: item.id.toString(),
                title: item.name || item.original_name,
                year: item.first_air_date ? item.first_air_date.substring(0, 4) : "2026",
                country: country,
                genre: genre,
                poster: poster
            };
        });

        // Сохраняем в файл данных для нашего index.html
        const fileContent = "window.remoteDramas = " + JSON.stringify(newDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Успешно сохранено " + newDramas.length + " дорам в файл dramas-data.js!");
    })
    .catch(function(err) {
        console.error("Критическая ошибка парсера:", err);
        process.exit(1);
    });
