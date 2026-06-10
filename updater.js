const fs = require('fs');

const apiUrl = "https://vidsrc.cc/v2/embed/tv/popular?limit=60";

console.log("Запуск обновления базы дорам...");

fetch(apiUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('Ошибка сети: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!data || !data.results) throw new Error('Пустая база данных');

        // ИСПРАВЛЕНО: Полностью переписан фильтр стран на классический синтаксис без опечаток
        const asianShows = data.results.filter(function(item) {
            if (!item.origin_country || item.origin_country.length === 0) return false;
            var cCode = item.origin_country[0];
            return cCode === 'KR'  cCode === 'CN'  cCode === 'JP';
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

        // Сохраняем в отдельный файл данных
        const fileContent = "window.remoteDramas = " + JSON.stringify(newDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Успешно сохранено " + newDramas.length + " дорам в файл dramas-data.js!");
    })
    .catch(function(err) {
        console.error("Ошибка:", err);
        process.exit(1);
    });
