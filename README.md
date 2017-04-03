npm install or yarn install

npm run server:build && npm run client:build

MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js

Start without the admin
DISABLE_ADMIN=true MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js