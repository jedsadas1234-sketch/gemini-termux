# Gemini Termux Web UI

A Gemini-style chat page that lets Gemini turn your requests into shell commands and run them in Termux.

## Install (Termux)

```bash
pkg update && pkg upgrade
pkg install nodejs git
git clone https://github.com/<your-username>/gemini-termux.git
cd gemini-termux
npm install
npm start
```

Then open `http://127.0.0.1:3000` in your phone's browser.

## Setup

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Open Settings in the web UI.
3. Paste the API key and a model name (for example `gemini-2.5-flash`), then save.

The key is stored in your browser's localStorage only. It is never written to the server.

## How it works

- `index.html` is the chat UI. It calls the Gemini API directly from the browser.
- Gemini replies with JSON: `COMMAND` (with a shell command) or `CHAT`.
- For `COMMAND`, the page sends it to `server.js` over Socket.IO (`run_command`).
- `server.js` runs it with `child_process.exec` and sends back `cmd_result`.

## Security warning

This server executes whatever command it receives, and the AI decides what gets sent. Be careful:

- The server binds to `127.0.0.1` by default, so only your own device can reach it. Do not change `HOST` to `0.0.0.0` unless you know exactly what you are doing, since anyone on your network could then run commands on your phone.
- AI can make mistakes. Read the command before trusting the result, and avoid asking for destructive things like deleting files.

## License

MIT
