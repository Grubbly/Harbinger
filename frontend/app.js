const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// TODO: Change me to use logic
let url;
if (true || process.env.NODE_ENV === 'DEV') {
    console.log("Dev");
    url = 'http://localhost:8080/';
} else {
    console.log("Production");
    url = `file://${process.cwd()}/dist/index.html`;
}


function createWindow() {
    let window = new BrowserWindow({
        width: 800, 
        height: 600
    });
    window.loadURL(url);

    window.on('closed', () => {
        window = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})