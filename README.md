## REQUIREMENTS
- node 6.x
- npm 3.1x
- mongodb server
- yarn (optional)

## WEB APP SETUP

### Install Packages
```
npm i
```
### Server Development
```
npm run start
```
Runs at [http://localhost:3000]()

### Server Production
```
npm run build
```


--------------

## ADMIN APP SETUP
(May not be current)
1. Execute: `yarn install`
2. Execute: `yarn server:build && yarn client:build`
3. Execute: `yarn start-admin`
4. Go to build folder: `cd build`
5. Run the application: `ADMIN=true MONGODB_URI=mongodb://localhost/eternity-ready node ./server-bundle.js`. (For Windows users: `SET ADMIN=true && SET MONGODB_URI=mongodb://localhost/eternity-ready && node ./server-bundle.js`)
6. Open the application in the browser: http://localhost:3030/admin/login
7. Credentials: Create a user via web app, then edit user in MongoDB toggle `validated` to `true`

https://www.tripadvisor.com/GARecord? 
gac=STANDARD_PAGINATION_VISIBLE&
gaa=numPages&
gal=371&
gav=0&
gani=false&
gass=Attraction_Review&
gasl=196473&
gapu=WR36qgokHV8AATI6Bz4AAABB&
gams=0

https://www.tripadvisor.com/Attraction_Review-g187870-d196473-Reviews-Peggy_Guggenheim_Collection-Venice_Veneto.html#REVIEWS
https://www.tripadvisor.com/Attraction_Review-g187870-d196473-Reviews-or10-Peggy_Guggenheim_Collection-Venice_Veneto.html#REVIEWS
https://www.tripadvisor.com/Attraction_Review-g187870-d196473-Reviews-or200-Peggy_Guggenheim_Collection-Venice_Veneto.html#REVIEWS