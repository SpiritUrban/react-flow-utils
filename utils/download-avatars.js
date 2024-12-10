const fs = await import("fs");
const pathModule = await import("path");
const axios = (await import("axios")).default;

const downloadAvatars = async (inputPath, outputDir) => {
    try {
        // Читаем JSON-файл с пользователями
        const data = await fs.promises.readFile(inputPath, "utf-8");
        const users = JSON.parse(data);

        // Создаём папку avatars, если её нет
        await fs.promises.mkdir(outputDir, { recursive: true });

        for (const user of users) {
            const { login, avatar_url } = user;

            try {
                // Загружаем аватар
                const response = await axios.get(avatar_url, { responseType: "arraybuffer" });

                // Сохраняем файл
                const filePath = pathModule.join(outputDir, `${login}.jpg`);
                await fs.promises.writeFile(filePath, response.data);

                console.log(`Avatar for ${login} saved to ${filePath}`);
            } catch (error) {
                console.error(`Failed to download avatar for ${login}: ${error.message}`);
            }
        }

        console.log("All avatars processed successfully.");
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Пути к файлу с данными и папке для аватарок
const inputPath = "./data/filtered_users.json";
const outputDir = "./avatars";

// Запуск функции
await downloadAvatars(inputPath, outputDir);
