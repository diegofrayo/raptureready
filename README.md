
# WEB APP

npm install or yarn install
npm run server:build && npm run client:build
MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js

# ADMIN APP

npm install or yarn install
npm run server:build && npm run client:build
ADMIN=true MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js
