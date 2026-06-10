const fs = require('fs');

const apiUrl = "https://vidsrc.cc/v2/embed/tv/popular?limit=60";

console.log("Запуск обновления базы дорам...");

fetch(apiUrl)
    .then(res => {
        if (!res.ok) throw new Error('Ошибка сети: ' + res.status);
        return res.json();
    })
    .then(data => {
        if (!data || !data.results) throw new Error('Пустая база данных');

        // Фильтруем только Азию
        const asianShows = data.results.filter(item => {
            if (!item.origin_country) return false;
            const code = item.origin_country[0];
            return code === 'KR'  code === 'CN'  code === 'JP';
        });

        const newDramas = asianShows.map((item, index) => {
            let country = "Южная Корея";
            if (item.origin_country[0] === 'CN') country = "Китай";
            if (item.origin_country[0] === 'JP') country = "Япония";

            let genre = "Романтика";
            if (item.genre_ids && item.genre_ids.length > 0) {
                const gId = item.genre_ids[0];
                if (gId === 10759 || gId === 9648) genre = "Экшен";
                if (gId === 14 || gId === 878) genre = "Фэнтези";
            }

            let poster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500";
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

        // Просто сохраняем готовый массив в отдельный файл, не трогая index.html!
        const fileContent = window.remoteDramas = ${JSON.stringify(newDramas, null, 4)};;
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log(Успешно сохранено ${newDramas.length} дорам в файл dramas-data.js!);
    })
    .catch(err => {
        console.error("Ошибка:", err);
        process.exit(1);
    });
