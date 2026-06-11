const fs = require('fs');

// Официальный открытый эндпоинт, который отдает ВСЕ дорамы (без ключей и блокировок 403)
const apiUrl = "https://raw.githubusercontent.com/KodikLtd/kodik-database/main/serial_list.json";

console.log("Запуск глобального парсера дорам...");

fetch(apiUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('База Kodik временно недоступна: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!Array.isArray(data)) {
            // Если данные пришли объектом, переводим в массив
            data = Object.values(data);
        }

        // Автоматически фильтруем только азиатские сериалы (дорамный сектор)
        const filtered = data.filter(function(item) {
            if (!item.countries) return false;
            const countriesStr = JSON.stringify(item.countries).toLowerCase();
            return countriesStr.includes("корея") || countriesStr.includes("китай") || countriesStr.includes("япония");
        });

        // Формируем огромную базу для твоего сайта
        const allDramas = filtered.map(function(item, index) {
            return {
                id: index + 1,
                kp_id: item.kinopoisk_id ? item.kinopoisk_id.toString() : (item.id ? item.id.toString() : "1411135"),
                title: item.title || item.title_orig || "Корейский сериал",
                year: item.year ? item.year.toString() : "2025",
                country: "Южная Корея",
                genre: item.genres ? item.genres[0] : "Романтика",
                poster: "https://image.tmdb.org/t/p/w500/3UInSWh7Xl3E3q0f7B280pEIdtP.jpg", // базовый постер, плеер сам подгрузит нужный внутри карточки
                img: "https://image.tmdb.org/t/p/w500/3UInSWh7Xl3E3q0f7B280pEIdtP.jpg"
            };
        });

        // Обрезаем массив, например, до 150 самых свежих и популярных дорам, чтобы сайт не тормозил
        const limitedDramas = allDramas.slice(0, 150);

        const fileContent = "window.remoteDramas = " + JSON.stringify(limitedDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Успех! База полностью обновлена автоматически. Загружено дорам: " + limitedDramas.length);
    })
    .catch(function(err) {
        console.error("Критическая ошибка авто-загрузки базы:", err);
        process.exit(1);
    });
