# REQUERIMENTS

- node 6.x
- mongodb server
- yarn (recommended)

--------------

# WEB APP SETUP

1. Execute: `npm install or yarn install`

2. Execute: `npm run server:build && npm run client:build`

3. Go to build folder: `cd build`

4. Run the application: `MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js`

5. Open the application in the browser: http://localhost:3030/login

--------------

# ADMIN APP SETUP

1. Execute: `npm install or yarn install`

2. Execute: `npm run server:build && npm run client:build`

3. Go to build folder: `cd build`

4. Run the application: `ADMIN=true MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js`
