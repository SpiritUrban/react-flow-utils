const log = console.log;

log("Start readAndFilterJson");


const fs = await import("fs");
const pathModule = await import("path");

const readAndFilterJson = async (inputPath, outputPath) => {
    try {
        // Читаем исходный JSON-файл
        const data = await fs.promises.readFile(inputPath, "utf-8");

        // Парсим JSON
        const users = JSON.parse(data);

        // Фильтруем нужные поля
        const filteredUsers = users.map(({ login, avatar_url }) => ({
            login,
            avatar_url
        }));

        // Создаем директорию для выходного файла, если её нет
        const directory = pathModule.dirname(outputPath);
        await fs.promises.mkdir(directory, { recursive: true });

        // Записываем отфильтрованный JSON в новый файл с форматированием
        await fs.promises.writeFile(outputPath, JSON.stringify(filteredUsers, null, 2));
        console.log("Filtered data written successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
};

// Пути к файлам
const inputPath = "./data/users.json";
const outputPath = "./data/filtered_users.json";

// Запуск функции
await readAndFilterJson(inputPath, outputPath);
