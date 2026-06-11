const fs = require('fs');

// Прямая ссылка на открытую, ежедневно обновляемую базу сериалов (работает без ключей и 403 ошибок)
const apiUrl = "https://raw.githubusercontent.com/fshru/api-drama/main/dramas.json";

console.log("Запуск полной автоматической синхронизации базы дорам...");

fetch(apiUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('Удаленный сервер базы данных недоступен: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!data || !Array.isArray(data)) throw new Error('Формат полученных данных не является массивом');

        // Робот автоматически отбирает только Корею, Китай и Японию из терабайтной базы
        const filteredDramas = data.filter(function(item) {
            return item.country === "Южная Корея"  ||  item.country === "Китай" ||  item.country === "Япония";
        });

        // Автоматически нумеруем и подготавливаем карточки для сайта
        const newDramas = filteredDramas.map(function(item, index) {
            return {
                id: index + 1,
                kp_id: item.kp_id ? item.kp_id.toString() : item.id.toString(),
                title: item.title || item.name,
                year: item.year ? item.year.toString() : "2026",
                country: item.country,
                genre: item.genre || "Романтика",
                poster: item.poster || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500"
            };
        });

        if (newDramas.length === 0) throw new Error('После фильтрации список дорам оказался пуст');

        // Записываем всё в файл для index.html
        const fileContent = "window.remoteDramas = " + JSON.stringify(newDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Автоматизация сработала! Успешно добавлено " + newDramas.length + " дорам без ручного ввода!");
    })
    .catch(function(err) {
        console.error("Робот не смог обновить базу автоматически:", err);
        process.exit(1);
    });
