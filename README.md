<div align="center">
  <img src="assets/discord.png" alt="Discord logo" width="100" />
  <img src="assets/emby.png" alt="Emby logo" width="100">
  <h1>Emby wrapper for Discord</h1>
</div>

- [🎵 How it works](#-how-it-works)
- [📌 Known problems](#-how-it-works)
- [📥 Setup](#-setup)
- [💻 Development](#-development)
- [🔨 Build](#-build)
- [🔐 License](#-license)

## 🎵 How it works

The Electron application connects to your Discord client via RPC. Then, when you're listening to music, it will send updates to Discord so it can display it on your profile using Rich Presence.

## 📌 Known problems

- When on the fullscreen player page, the application thinks you're switching music
- If you go on an other website than an Emby instance, the application will not work

## 📥 Setup

First, install the dependencies required by the application, such as the Electron library. Use one of these commands in your terminal :

```bash
npm install  # if you use NPM

yarn install # if you use Yarn
```

Then, create a `config.json` file based on the `config.sample.json` file, and replace the `url` field with your Emby instance's URL.

## 💻 Development

To run the application for development, use one of these commands :

```bash
npm start  # if you use NPM

yarn start # if you use Yarn
```

## 🔨 Build

If you want to have an executable file, build the application using one of these commands :

```bash
npm run build  # if you use NPM

yarn build     # if you use Yarn
```

## 🔐 License

MIT License

Copyright (c) 2019 Exybore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
