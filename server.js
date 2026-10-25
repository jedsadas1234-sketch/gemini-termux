const express = require('express');
const http = require('http');
const path = require('path');
const { exec } = require('child_process');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
// Bind to localhost only: anyone who can reach this server can run shell commands.
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

io.on('connection', (socket) => {
  socket.on('run_command', (command) => {
    if (typeof command !== 'string' || !command.trim()) {
      return socket.emit('cmd_result', { error: 'Empty command' });
    }

    exec(command, { timeout: 60000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
      socket.emit('cmd_result', {
        stdout: stdout || '',
        stderr: stderr || '',
        error: error && !stdout && !stderr ? error.message : null
      });
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Gemini Termux Web UI running at http://${HOST}:${PORT}`);
});
