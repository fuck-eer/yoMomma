const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow {
	constructor({ url, ...restOptions }) {
		super(restOptions);
		this.loadFile(url);
		this.on("blur", this.onBlur.bind(this));
	}
	onBlur() {
		this.hide();
	}
}

module.exports = MainWindow;
