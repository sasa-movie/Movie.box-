const fs = require('fs');

// Используем полностью открытый источник списков сериалов, не требующий ключей авторизации
const apiUrl = "https://raw.githubusercontent.com/BigBro99/dramas-json/main/dramas.json";

console.log("Запуск автообновления каталога из открытого репозитория дорам...");

fetch(apiUrl)
    .then(function(res) {
        if (!res.ok) throw new Error('Ошибка получения данных: ' + res.status);
        return res.json();
    })
    .then(function(data) {
        if (!data || !Array.isArray(data)) throw new Error('Некорректный формат базы дорам');

        // Фильтруем контент, оставляя только Корею, Китай и Японию
        const newDramas = data.filter(function(item) {
            return item.country === "Южная Корея"  ||  item.country === "Китай"  ||   item.country === "Япония";
        });

        // Записываем готовый массив дорам прямо в файл нашего сайта
        const fileContent = "window.remoteDramas = " + JSON.stringify(newDramas, null, 4) + ";";
        fs.writeFileSync('dramas-data.js', fileContent, 'utf8');
        
        console.log("Успешно импортировано " + newDramas.length + " дорам в файл dramas-data.js!");
    })
    .catch(function(err) {
        console.error("Критическая ошибка робота:", err);
        process.exit(1);
    });
