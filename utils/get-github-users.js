import axios from "axios";

const log = console.log;


log("Stert get-github-sers");

const getGithubUsers = async () => {
    const response = await axios.get("https://api.github.com/users");
    return response.data;
}


const outputFile = "data/users.json";
const writeFile = async (path, data) => {
    const fs = await import("fs");
    const pathModule = await import("path");
    
    // Получаем директорию из пути
    const directory = pathModule.dirname(path);

    try {
        // Создаем директории, если их нет
        await fs.promises.mkdir(directory, { recursive: true });

        // Определяем, является ли файл JSON
        if (pathModule.extname(path).toLowerCase() === ".json") {
            log("File is JSON");
            // Если JSON, форматируем
            data = JSON.stringify(data, null, 2); // С отступами в 2 пробела
        }

        // Пишем файл
        await fs.promises.writeFile(path, data);
        console.log("File written successfully!");
    } catch (err) {
        console.error("Error:", err);
    }
};


const users = await getGithubUsers();
await writeFile(outputFile, users);
// log(users);


