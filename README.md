This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Overview

MoneyBook is a finance app that can link to your bank accounts to retrieve information such as your balance and liabilities. This app summarizes all the information to provide users with insights.

## Step 1: Start Back-end Server

First, you will need to open an new terminal and change direction to server folder.

To start back-end server, run the following command:

```bash
# install package
npm i
# run server
npm run server
```

## Step 2: Setup your environment

You can find the .evn file in the root folder. Change the IPAddress to your IPv4 address.

> **_NOTE:_**  The IPv4 address can be obtained from the ipconfig command in the prompt command window.

## Step 3: Start your application

Open an new Terminal and make sure the direction is in the root folder
To start the application, run the following command:

```bash
# install package
npm i
# run application
npm start
```
Now that you have successfully run the app.

## Step 4: Link the virtual accounts

Navigate to the account page and click the plus button on the top right screen.

For a Canadian account, use "custom_user3" and a non-empty password to log in.

For a USD account, use "custom_user4" and a non-empty password to log in.


# Troubleshooting

If you encounter a CMAKE building error, please make sure the length of the project's path does not exceed 250 characters.


# kill Program on specific port

netstat -ano | findstr :<PORT>

taskkill /PID <PID> /F