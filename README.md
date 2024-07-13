# Overview

MoneyBook is a comprehensive financial management application that securely connects to your bank accounts using [Plaid](https://plaid.com/)'s technology. By accessing your financial data, including account balances, liabilities, and transaction history, MoneyBook provides users with valuable insights and a clear overview of their financial situation. The app analyzes this information to offer personalized summaries and help users make informed financial decisions.


Home             |  Account | Analysis | Analysis
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
![Home Page](https://github.com/TimLinCa/MoneyBook/blob/main/assets/images/readme/Home.png)  | ![Account Page](assets\images\readme\Account.png "Account") | ![Analysis Page](assets\images\readme\Analysis.png "Analysis") | ![Analysis Page](assets\images\readme\Analysis2.png "Analysis")

# Features
<ul>
<li>Financial Overview: Comprehensive summary of your financial status</li>
<li>Budget Tracking: Tools to create, manage, and monitor your budgets</li>
<li>Account Integration: Seamless management of multiple bank accounts</li>
<li>Expense Insights: Detailed analysis of income and spending patterns</li>
</ul>

# How to start the demo
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