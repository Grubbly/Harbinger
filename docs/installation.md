## Installation
* ***Install Akash CLI and add it to PATH*** 
* See ([https://docs.akash.network/guides/install](https://docs.akash.network/guides/install) for more details)

### Backend Installation / Quickstart

#### Quickstart

``` shell
cd backend
npm install
npm run debug
```

### Backend Run Commands

``` shell
# Starts the backend in debug mode with verbose logging to console
npm run debug

# Runs backend tests if you want to verify functionality
npm run test

# Removes extra files such as sqlite database files
npm run clean-debug
```

### Frontend Installation / Quickstart
 
#### Quickstart Electron

```
cd frontend
npm install
npm run start
```

#### Quickstart Web
```
cd frontend
npm install
npm run serve
```

#### Quickstart Electron/Web With Hot Reload

Terminal Process 1:
```
cd frontend
npm install

# Start web application w/ hot reload functionality
npm run serve
```

Terminal Process 2:
```
# In another terminal or as a child process:
npm run start
# This will reflect activity from the web application in electron
```

Note: Make sure `npm run serve` finsihes executing before `npm run start` or else you will not see anything on the electron app.

### Frontend Run Commands
```
# Build the app and run it using electron
npm run start

# Start the app in browser
npm run serve
```
