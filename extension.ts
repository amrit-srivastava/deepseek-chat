import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('deepseek-chat.startChat', () => {
        const panel = vscode.window.createWebviewPanel(
            'deepseekChat',
            'Deepseek Chat',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = getWebviewContent();

        // Listen for messages from the Webview
        panel.webview.onDidReceiveMessage(
            async (message) => {
                console.log("Received message from Webview:", message);
                if (message.command === 'chat') {
                    const response = await askDeepseek(message.text);
                    console.log("Sending response to Webview:", response);
                    panel.webview.postMessage({ command: 'response', text: response });
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}

async function askDeepseek(prompt: string): Promise<string> {
    try {
        console.log("Sending request to Ollama:", prompt);

        const response = await axios.post('http://127.0.0.1:11434/api/generate', {
            model: "deepseek-r1:1.5b",  // Use locally installed Deepseek model
            prompt: prompt,
            stream: false
        });

        console.log("Raw response from Ollama:", response.data);

        return response.data.response || "No response from Deepseek.";
    } catch (error) {
        console.error("Error communicating with Ollama:", error);

        if (error instanceof Error) {
            return `Error: ${error.message}`;
        } else {
            return "An unknown error occurred while connecting to Deepseek.";
        }
    }
}




function getWebviewContent() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Deepseek Chat</title>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                const vscode = acquireVsCodeApi();
                const askBtn = document.getElementById("askBtn");
                const promptInput = document.getElementById("prompt");
                const output = document.getElementById("output");

                askBtn.addEventListener("click", () => {
                    const text = promptInput.value.trim();
                    if (text) {
                        console.log("Sending message to VS Code:", text);
                        vscode.postMessage({ command: 'chat', text });
                        output.innerText = "Waiting for response...";
                    }
                });

                // Listen for messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    console.log("Received message from VS Code:", message);
                    if (message.command === 'response') {
                        output.innerText = message.text;
                    }
                });
            });
        </script>
    </head>
    <body>
        <h1>Deepseek Chat</h1>
        <input type="text" id="prompt" placeholder="Ask Deepseek..." autofocus>
        <button id="askBtn">Send</button>
        <p id="output"></p>
    </body>
    </html>
    `;
}
