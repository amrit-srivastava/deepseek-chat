# 🌟 Deepseek Chat - VS Code Extension

🚀 A VS Code extension that integrates **Deepseek AI** using **Ollama**, allowing you to chat directly from your editor.

---

## ✨ Features
✔️ Chat with **Deepseek AI** via **Ollama**.  
✔️ Seamless integration with **VS Code Webview**.  
✔️ Interactive UI with **event listeners** for user interaction.  

---

## 📌 Prerequisites
Ensure you have the following installed:

🔹 **Node.js** (Latest LTS)
   ```sh
   node -v
   ```
🔹 **VS Code** (Latest version)
🔹 **Yeoman and VS Code Extension Generator** (If not installed)
   ```sh
   npm install -g yo generator-code
   ```

---

## 🚀 Setup Instructions

### 🏗️ 1️⃣ Clone the Repository
```sh
git clone https://github.com/amrit-srivastava/deepseek-chat.git
cd deepseek-chat-vscode
```

### 📦 2️⃣ Install Dependencies
```sh
npm install
```

### ⚙️ 3️⃣ Install and Run Ollama
Ensure **Ollama** is installed and running with the `deepseek-r1:1.5b` model.
```sh
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve
ollama run deepseek-r1:1.5b
```

### 🏗️ 4️⃣ Compile the Extension
```sh
npm run compile
```

### 🖥️ 5️⃣ Run the Extension in VS Code
```sh
code .
```
- Press **`F5`** to launch the extension.
- Open the **Command Palette** (`Ctrl + Shift + P`).
- Search for and run: **Deepseek Chat**.

---

## 🔧 Troubleshooting

### ❓ **Command Not Found in Command Palette**
🛠️ Ensure your extension is activated:
```sh
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run compile
```
🛠️ Manually execute the command in **Developer Console**:
```javascript
vscode.commands.executeCommand('deepseek-chat.startChat');
```
🛠️ If still not working, check **package.json**:
```json
"activationEvents": ["onCommand:deepseek-chat.startChat"]
```

---

## 🤝 Contributing
1. 🍴 Fork the repository.  
2. 🛠️ Create a new branch (`feature-branch`).  
3. 💾 Commit your changes.  
4. 📤 Push and create a **Pull Request**.  

---

## 📜 License
📝 This project is licensed under the **MIT License**.

---

### 🎯 **Now you can chat with Deepseek AI inside VS Code!** 🚀

