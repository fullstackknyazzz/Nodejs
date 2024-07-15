const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware для обработки JSON-запросов
app.use(express.json());

const FILE_PATH = './users.json';

// Функция для чтения данных из файла
const readUsersFromFile = () => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

// Функция для записи данных в файл
const writeUsersToFile = (users) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};

// Получение всех пользователей
app.get('/users', (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

// Получение пользователя по ID
app.get('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// Создание нового пользователя
app.post('/users', (req, res) => {
  const users = readUsersFromFile();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).json(newUser);
});

// Обновление пользователя
app.put('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { id: users[index].id, ...req.body };
    writeUsersToFile(users);
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
  const users = readUsersFromFile();
  const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
  if (newUsers.length !== users.length) {
    writeUsersToFile(newUsers);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
