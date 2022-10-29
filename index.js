const { app, globalShortcut, clipboard } = require("electron");
const MainWindow = require("./app/mainWindow");
const JokahhTray = require("./app/jokahhTray");
const { getJoke, getNumberOfJokes } = require("./assets/jokes");
const path = require("path");

let mainWindow;
let tray;
const isMac = process.platform === "darwin";
app.setLoginItemSettings({
	openAtLogin: true,
});
app.on("ready", () => {
	isMac && app.dock.hide();
	const iconPath = path.join(
		__dirname,
		`./assets/icons/${!isMac ? "win-icon.png" : "mac-icon.png"}`
	);
	mainWindow = new MainWindow({
		url: `${__dirname}/src/index.html`,
		height: 300,
		width: 200,
		frame: false,
		resizable: false,
		show: false,
		skipTaskbar: true,
	});
	tray = new JokahhTray(iconPath, mainWindow);

	globalShortcut.register("ctrl+k", () => {
		const index = Math.floor(Math.random() * (getNumberOfJokes() - 1));
		clipboard.writeText(getJoke(index));
	});
});
