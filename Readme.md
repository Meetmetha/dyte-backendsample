## Dyte.io Backend Sample demonstrating how API works 
Here I refer an example of doubt solving session between Teacher & Student where Admin creates a meeting and then Teacher & Students join It with Authtokens generated during meeting creation itself
## It covers 3 endpoints
#### /meeting/create-meeting-session (Create a meeting between Teacher & Student)
To add some sort of authentication adminheader is passed with secret which is verified with env file secret
#### /meeting/student-join (Join a meeting by Student with meetingId and his own ID)
Join a meeting which he is enrolled during meeting Creation
#### /meeting/teacher-join (Join a meeting by Teacher with meetingId and his own ID)
Join a meeting which he is enrolled during meeting Creation

### Steps to Setup
Note: git init is required before npm install
```
git clone https://github.com/Meetmetha/dyte-backendsample
cd dyte-backendsample
npm install
```
### Setup Enviornment & Keys: check env.example (Create filename : .env) 
MONGODB_URL & ADMIN_SECRET are required along with Dyte config

```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/dytesample
JWT_SECRET=ThisIsMySecretJWT
ADMIN_SECRET=ThisisSecretHeaderValue
DYTE_ORG_ID=here comes ORGID
DYTE_API_KEY=ApiKeyhere
DYTE_API_BASE_URL=https://api.cluster.dyte.in/v1 (Make sure you have v1 at end of url)
```
### Run Project
```
npm run start
```
### Output 🥳
```
visit your localhost:3000 and follow below documentation
```
#### API Documentation: https://documenter.getpostman.com/view/14843355/UVJfjFrG

### Troubleshooting 
Getting Error related to Admin Secret: Crosscheck secrets in env file and header
Getting Error with Dyte: It would probably because of Credentials

### Reachme
Mitesh Metha  
https://miteshmetha.com
