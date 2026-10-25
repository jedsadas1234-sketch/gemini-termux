# Gemini Termux Web UI

A Gemini-style chat page that lets Gemini turn your requests into shell commands and run them in Termux.

## Requirements

- Termux (Android)
- An internet connection (the UI loads Tailwind, icons and fonts from CDNs)
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Install

Run each step one at a time. Wait for it to finish before pasting the next one.

**1. Update packages** (if it asks `Continue? [Y/n]`, type `y` and press Enter)

```bash
pkg update && pkg upgrade
```

**2. Install Node.js and Git**

```bash
pkg install -y nodejs git
```

**3. Download the project**

```bash
git clone https://github.com/jedsadas1234-sketch/gemini-termux.git
```

**4. Go into the project folder**

```bash
cd gemini-termux
```

**5. Install the project packages**

```bash
npm install
```

**6. Start the server**

```bash
npm start
```

When you see `running at http://127.0.0.1:3000`, open that link in your phone's browser.

## Get a Gemini API key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey) and sign in with your Google account.
2. Click **Create API key**.
3. Choose an existing Google Cloud project, or create a new one if it asks.
4. Copy the key that appears (it usually starts with `AIza`).

The free tier has rate limits, which is fine for personal use. Google may change the layout of the page, but the API key page is always at the link above.

> Keep your key private. Don't post it in Discord, screenshots, or GitHub.

## Setup

1. Open **Settings** in the web UI.
2. Paste your Gemini API key and a model name (for example `gemini-2.5-flash`).
3. Press **Save Settings** and start prompting.

The API key is saved in your browser's localStorage only. It is never sent to or stored by the server.

## How it works

- `index.html` is the chat UI and calls the Gemini API directly from the browser.
- Gemini replies with JSON: `COMMAND` (with a shell command) or `CHAT`.
- For `COMMAND`, the page sends the command to `server.js` over Socket.IO (`run_command`).
- `server.js` runs it with `child_process.exec` and sends the output back (`cmd_result`).

## Security warning

This server runs whatever command it receives, and the AI decides what gets sent.

- The server only listens on `127.0.0.1`, so only your own device can reach it. Do not change `HOST` to `0.0.0.0` unless you know exactly what you are doing, because anyone on your network could then run commands on your phone.
- AI can make mistakes. Read the command before trusting the result, and don't ask it to delete things you care about.

## License

MIT
