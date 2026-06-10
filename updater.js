const fs = require('fs');

// Подключаемся к базе за популярными сериалами (она отдает данные без CORS блокировок на уровне сервера)
const apiUrl = "https://vidsrc.cc/v2/embed/tv/popular?limit=60";

console.log("Запуск автоматического обновления каталога дорам...");

fetch(apiUrl)
    .then(res => {
        if (!res.ok) throw new Error('Ошибка сервера базы данных: ' + res.status);
        return res.json();
    })
    .then(data => {
        if (!data || !data.results) throw new Error('База вернула пустой ответ');

        // Отфильтруем только азиатский контент (Корея, Китай, Япония)
        const asianShows = data.results.filter(item => {
            if (!item.origin_country) return false;
            const code = item.origin_country[0];
            return code === 'KR'  code === 'CN'  code === 'JP';
        });

        // Форматируем данные в массив для твоего сайта
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
                year: item.first_air_date ? item.first_air_date.substring(0, 4) : "2025",
                country: country,
                genre: genre,
                poster: poster
            };
        });

        if (newDramas.length === 0) {
            console.log("Новых дорам в трендах сейчас нет. Пропускаем обновление.");
            process.exit(0);
        }

        // Читаем текущий файл index.html
        let htmlContent = fs.readFileSync('index.html', 'utf8');

        // Ищем твою старую ручную функцию loadDramasFromAPI
        // И полностью заменяем её внутренности на новый массив, который мы скачали!
        const functionStartPattern = "function loadDramasFromAPI() {";
        const startIdx = htmlContent.indexOf(functionStartPattern);

        if (startIdx === -1) {
            throw new Error("Не удалось найти функцию loadDramasFromAPI в вашем index.html. Проверьте её наличие.");
        }

        // Генерируем новый текст для этой функции
        const updatedFunctionText = function loadDramasFromAPI() {
    window.dramas = ${JSON.stringify(newDramas, null, 4)};
    applyDoubleFilter();
};

        // Находим, где функция заканчивается (ищем следующую закрывающую фигурную скобку)
        // Для безопасности мы просто заменим старый кусок кода до следующего логического блока.
        // Чтобы всё прошло гладко, мы перепишем функцию до её закрытия.
        // Предполагаем, что старая функция заканчивается закрытием скобки. 
        // Мы найдем старую функцию и заменим её целиком с помощью регулярного выражения.
        
        const regex = /function loadDramasFromAPI\(\s*\)[\s\S]*?\}\s*\/\/ конец loadDramasFromAPI|function loadDramasFromAPI\(\s*\)[\s\S]*?applyDoubleFilter\(\);\s*\}/;
        
        if (regex.test(htmlContent)) {
            htmlContent = htmlContent.replace(regex, updatedFunctionText);
        } else {
            // Если точное совпадение не найдено, заменим старую функцию грубым, но рабочим методом подмены строки
      const endIdx = htmlContent.indexOf("applyDoubleFilter();", startIdx);
            if (endIdx !== -1) {
                const closeBraceIdx = htmlContent.indexOf("}", endIdx);
                const part1 = htmlContent.substring(0, startIdx);
                const part2 = htmlContent.substring(closeBraceIdx + 1);
                htmlContent = part1 + updatedFunctionText + part2;
            } else {
                throw new Error("Не удалось автоматически переписать структуру index.html");
            }
        }

        // Записываем обновленный index.html обратно на диск
        fs.writeFileSync('index.html', 'htmlContent', 'utf8');
        fs.writeFileSync('index.html', htmlContent, 'utf8');
        console.log(Успешно добавлено ${newDramas.length} автоматических дорам в index.html!);
    })
    .catch(err => {
        console.error("Критическая ошибка работы робота:", err);
        process.exit(1);
    });
