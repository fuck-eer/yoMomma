const { Tray, Menu, app } = require("electron");
const menuTemplate = [
	{
		label: "Quit",
		click: () => {
			app.quit();
		},
	},
];
const isMac = process.platform === "darwin";
class JokahhTray extends Tray {
	constructor(iconPath, mainWindow) {
		super(iconPath);
		this.mainWindow = mainWindow;
		this.setToolTip("JokAHH:The Insult Helper");
		this.on("click", this.onClick);
		this.on("right-click", this.onRightClick);
	}

	onClick = (event, bounds) => {
		const { x, y } = bounds;
		const { height, width } = this.mainWindow.getBounds();

		if (this.mainWindow.isVisible()) {
			console.log("here");
			this.mainWindow.hide();
		} else {
			console.log(this.mainWindow.isVisible());
			this.mainWindow.setBounds({
				x: parseInt(x - width / 2),
				y: isMac ? y : parseInt(y - height),
				height,
				width,
			});
			this.mainWindow.show();
		}
	};
	onRightClick = () => {
		this.popUpContextMenu(Menu.buildFromTemplate(menuTemplate));
	};
}
module.exports = JokahhTray;
