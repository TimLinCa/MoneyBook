import { useMemo } from 'react';
import { MMKV } from 'react-native-mmkv';

class InstitutionToken {
  constructor(institutionName, token) {
    this.institutionName = institutionName;
    this.token = token;
  }
}

class AccountInfo {
  constructor(id, type, name, accountMask, balance, currencyCode) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.accountMask = accountMask;
    this.balance = balance;
    this.currencyCode = currencyCode;
  }
}

class TransactionInfo {
  constructor(id, accountId, date, name, amount, category) {
    this.id = id;
    this.accountId = accountId;
    this.date = date;
    this.name = name;
    this.amount = amount;
    this.category = category;
  }
}

class Budget {
  constructor(name, budget) {
    this.name = name;
    this.budget = budget;
    this.amount = 0;
  }

}

// const storage = new MMKV({
//   id: 'MoneyBook-storage',
//   encryptionKey: 'hunter2',
// });

const storage = new MMKV({
  id: 'MoneyBook-storage',
});

const InstitutionTokenTokenKey = 'InstitutionToken';
const accountInfo_base = 'accountInfo_';
const budgetInfo = 'budgetInfo';
const transactionInfo_base = 'transactionInfo_';

export const Test = () => {
  const namelist = GetInstitutionNameList();
  console.log(namelist);
  namelist.forEach((name) => {
    DeleteInstitutionInfo(name);
  }
  );
};

export const AddInstitutionToken = (institutionName, token) => {
  let tokenList = [];
  if (storage.contains(InstitutionTokenTokenKey)) {
    tokenList = JSON.parse(storage.getString(InstitutionTokenTokenKey));
  }
  else {
    tokenList = [];
  }

  if (tokenList.indexOf(tokenItem => tokenItem.institutionName === institutionName) > -1) {
    tokenList.find((tokenItem) =>
      tokenItem.institutionName === institutionName).token = token;
  }
  else {
    let institutionToken = new InstitutionToken(institutionName, token);
    tokenList.push(institutionToken);
  }

  storage.set(InstitutionTokenTokenKey, JSON.stringify(tokenList));
};

export const GetInstitutionToken = (institutionName) => {
  if (!storage.contains(InstitutionTokenTokenKey)) {
    return null;
  }
  var institutionTokenList = JSON.parse(storage.getString(InstitutionTokenTokenKey));
  var institutionToken = institutionTokenList.find((tokenItem) => tokenItem.institutionName === institutionName);
  return institutionToken.token;
};

export const GetInstitutionNameList = () => {

  let nameArray = [];
  if (storage.contains(InstitutionTokenTokenKey)) {
    var institutionTokenList = JSON.parse(storage.getString(InstitutionTokenTokenKey));
    institutionTokenList.forEach((tokenItem) => {
      nameArray.push(tokenItem.institutionName);
    });
  }

  return nameArray;
};

export const AsyncInstitutionAccountInfo = (institutionName, auth_getResult) => {
  const tableName = getAccountTableName(institutionName);
  let accountInfos = [];
  auth_getResult.accounts.forEach((account) => {
    let accountInfo = new AccountInfo(account.account_id, account.type, account.name, account.mask, account.balances.available, account.balances.iso_currency_code);
    accountInfos.push(accountInfo);
  });
  storage.set(tableName, JSON.stringify(accountInfos));
};

export const GetLocalInstitutionAccountInfo = (institutionName) => {
  const tableName = getAccountTableName(institutionName);
  let accountInfos = [];
  if (storage.contains(tableName)) {
    accountInfos = JSON.parse(storage.getString(tableName));
  }

  return accountInfos;
};

export const DeleteInstitutionInfo = (institutionName) => {
  storage.getAllKeys().forEach((key) => {
    if (key.includes(institutionName)) {
      storage.delete(key);
    }
  });

  let tokens = JSON.parse(storage.getString(InstitutionTokenTokenKey));
  tokens.splice(tokens.indexOf(tokens.find((token) => token.institutionName === institutionName)), 1);
  storage.set(InstitutionTokenTokenKey, JSON.stringify(tokens));
};

export const UpdateTransactionInfo = (institutionName, added, modified, removed, cursor) => {
  const tableName = getTransactionTableName(institutionName);
  const cursorKey = transactionInfo_base + institutionName + '_cursor';
  let transactionInfoList = [];
  console.log(added);
  if (storage.contains(tableName)) {
    transactionInfoList = JSON.parse(storage.getString(tableName));
  }

  for (let i = 0; i < added.length; i++) {
    let transactionInfo = new TransactionInfo(added[i].transaction_id, added[i].account_id, added[i].date, added[i].name, added[i].amount, added[i].personal_finance_category.primary);
    transactionInfoList.push(transactionInfo);
  }

  for (let i = 0; i < modified.length; i++) {
    let transactionInfo = transactionInfoList.find((transaction) => transaction.id === modified[i].transaction_id);
    transactionInfo.accountId = modified[i].account_id;
    transactionInfo.date = modified[i].date;
    transactionInfo.name = modified[i].name;
    transactionInfo.amount = modified[i].amount;
    transactionInfo.category = modified[i].personal_finance_category.primary;
  }

  for (let i = 0; i < removed.length; i++) {
    let index = transactionInfoList.findIndex((transaction) => transaction.id === removed[i].transaction_id);
    transactionInfoList.splice(index, 1);
  }

  if (cursor !== undefined) {
    storage.set(cursorKey, cursor);
  }

  storage.set(tableName, JSON.stringify(transactionInfoList));
};

export const GetTransactionCusror = (institutionName) => {
  const cursorKey = transactionInfo_base + institutionName + '_cursor';
  return storage.getString(cursorKey);
}

export const GetTransactionHistoryByAccountId = (institutionName, accountId) => {
  const tableName = getTransactionTableName(institutionName);
  let transactionInfoList = JSON.parse(storage.getString(tableName));
  let transactionHistory = transactionInfoList.filter((transaction) => transaction.accountId === accountId);
  return transactionHistory;
};

export const GetTransactionHistoryByMonth = (institutionName, year, month) => {
  const tableName = getTransactionTableName(institutionName);
  let transactionInfoList = JSON.parse(storage.getString(tableName));
  let transactionHistory = transactionInfoList.filter((transaction) => transaction.date.includes(year + '-' + month));
  return transactionHistory;
};

export const GetExpenseByMonth = (year, month) => {
  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetTransactionHistoryByMonth(institutionName, year, month));
  });
  transactionHistory = transactionHistory.filter((transaction) => transaction.date.includes(year + '-' + month) && transaction.amount < 0);
  return transactionHistory.sum((transaction) => transaction.amount);
};

export const GetIncomeByMonth = (year, month) => {
  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetTransactionHistoryByMonth(institutionName, year, month));
  });
  transactionHistory = transactionHistory.filter((transaction) => transaction.date.includes(year + '-' + month) && transaction.amount > 0);
  return transactionHistory.sum((transaction) => transaction.amount);
};

export const GetNetIncomeByMonth = (year, month) => {
  return GetIncomeByMonth(year, month) + GetExpenseByMonth(year, month);
};

export const AddBudgetItem = (budgetName, budget) => {
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));
  }

  let budgetItem = new Budget(budgetName, budget);
  budgetList.push(budgetItem);

  storage.set(budgetInfo, JSON.stringify(budgetList));
};

export const EditBudgetItem = (budgetName, budget, amount) => {
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));

    let index = budgetList.findIndex((budgetItem) => budgetItem.name === budgetName);
    if (index > -1) {
      budgetList[index].budget = budget;
      budgetList[index].amount = amount;
    }
    storage.set(budgetInfo, JSON.stringify(budgetList));
  }
};

export const getBudgetInfo = () => {
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));
  }
  return budgetList;
};

function getAccountTableName(institutionName) {
  return accountInfo_base + institutionName;
}

function getTransactionTableName(institutionName) {
  return transactionInfo_base + institutionName;
}

export default { AddInstitutionToken, GetInstitutionToken, GetInstitutionNameList, AsyncInstitutionAccountInfo, GetLocalInstitutionAccountInfo, UpdateTransactionInfo, Test };
