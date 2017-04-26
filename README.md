# REQUIREMENTS

- node 6.x
- mongodb server
- yarn

--------------

# WEB APP SETUP

1. Execute: `yarn install`

2. Execute: `yarn server:build && yarn client:build`

3. Execute: `yarn start`

4. Go to build folder: `cd build`

5. Run the application: `MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js`. (For Windows users: `SET MONGODB_URI=mongodb://localhost/eternity-ready && node ./server-bundle.js`)

6. Open the application in the browser: http://localhost:3030/login

--------------

# ADMIN APP SETUP

1. Execute: `yarn install`

2. Execute: `yarn server:build && yarn client:build`

3. Execute: `yarn start-admin`

4. Go to build folder: `cd build`

5. Run the application: `ADMIN=true MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js`. (For Windows users: `SET ADMIN=true && SET MONGODB_URI=mongodb://localhost/eternity-ready && node ./server-bundle.js`)
