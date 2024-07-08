const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Файл для хранения счетчиков
const countersFile = 'counters.json';

// Функция для чтения счетчиков из файла
const readCounters = () => {
    if (fs.existsSync(countersFile)) {
        const data = fs.readFileSync(countersFile);
        return JSON.parse(data);
    }
    return { home: 0, about: 0 };
};

// Функция для записи счетчиков в файл
const writeCounters = (counters) => {
    fs.writeFileSync(countersFile, JSON.stringify(counters, null, 2));
};

// Инициализация счетчиков
let counters = readCounters();

// Обработчик для главной страницы "/"
app.get('/', (req, res) => {
    counters.home += 1;
    writeCounters(counters);
    res.send(`Главная страница. Количество просмотров: ${counters.home}`);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
    counters.about += 1;
    writeCounters(counters);
    res.send(`Страница "О нас". Количество просмотров: ${counters.about}`);
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
