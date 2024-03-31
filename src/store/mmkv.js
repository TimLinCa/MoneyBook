
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
  constructor(id, accountId, date, name, amount, category, currencyCode) {
    this.id = id;
    this.accountId = accountId;
    this.date = date;
    this.name = name;
    this.amount = amount;
    this.category = category;
    this.currencyCode = currencyCode;
  }
}

class Budget {
  constructor(name, budget) {
    this.name = name;
    this.budget = budget;
    this.amount = 0;
  }
}

class ExchangeRate {
  constructor(to_currency, rate) {
    this.to_currency = to_currency,
      this.rate = rate;
  }
}

const storage = new MMKV({
  id: 'MoneyBook-storage',
});

const InstitutionTokenTokenKey = 'InstitutionToken';
const accountInfo_base = 'accountInfo_';
const budgetInfo = 'budgetInfo';
const transactionInfo_base = 'transactionInfo_';
const exchanged_rate = 'exchange_rate'
export const Test = () => {


  storage.delete(budgetInfo);
};

export const AddInstitutionToken = (institutionName, token) => {
  let tokenList = [];
  if (storage.contains(InstitutionTokenTokenKey)) {
    tokenList = JSON.parse(storage.getString(InstitutionTokenTokenKey));
  }
  else {
    tokenList = [];
  }

  if (tokenList.map(tokenItem => tokenItem.institutionName).indexOf(institutionName) > -1) {
    tokenList.find((tokenItem) =>
      tokenItem.institutionName === institutionName).token = token;
  }
  else {
    let institutionToken = new InstitutionToken(institutionName, token);
    tokenList.push(institutionToken);
  }

  storage.set(InstitutionTokenTokenKey, JSON.stringify(tokenList));
};



export const GetInstitutionIconUrl = (institutionName) => {

  if (storage.contains(InstitutionTokenTokenKey)) {
    const tokenList = JSON.parse(storage.getString(InstitutionTokenTokenKey));
    return tokenList.find((tokenItem) => tokenItem.institutionName === institutionName).logoUrl;
  }
  else {
    return null;
  }
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

export const UpdateAccountBalance = (institutionName, asyncBalanceRes) => {
  const tableName = getAccountTableName(institutionName);
  let accountInfos = [];
  if (storage.contains(tableName)) {
    accountInfos = JSON.parse(storage.getString(tableName));
  }

  asyncBalanceRes.data.accounts.forEach((account) => {
    let accountInfo = accountInfos.find((accountInformation) => accountInformation.id === account.account_id);
    accountInfo.balance = account.balances.available;
  });
  storage.set(tableName, JSON.stringify(accountInfos));
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

export const UpdateLastAsyncTime = (dateTime) => {
  storage.set('lastAsyncTime', dateTime);
};

export const GetLastAsyncTime = () => {
  if (!storage.contains('lastAsyncTime')) {
    return null;
  }
  return storage.getString('lastAsyncTime');
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
  if (storage.contains(tableName)) {
    transactionInfoList = JSON.parse(storage.getString(tableName));
  }

  for (let i = 0; i < added.length; i++) {
    if (added[i].iso_currency_code === undefined || added[i].iso_currency_code === null) {
      const accountInfos = GetLocalInstitutionAccountInfo(institutionName);
      const accountInfo = accountInfos.find(account => account.id === added[i].account_id);
      added[i].iso_currency_code = accountInfo.currencyCode;
    }
    let transactionInfo = new TransactionInfo(added[i].transaction_id, added[i].account_id, added[i].date, added[i].name, added[i].amount, added[i].personal_finance_category.primary, added[i].iso_currency_code);
    transactionInfoList.push(transactionInfo);
  }

  for (let i = 0; i < modified.length; i++) {
    let transactionInfo = transactionInfoList.find((transaction) => transaction.id === modified[i].transaction_id);
    transactionInfo.accountId = modified[i].account_id;
    transactionInfo.date = modified[i].date;
    transactionInfo.name = modified[i].name;
    transactionInfo.amount = modified[i].amount;
    transactionInfo.category = modified[i].personal_finance_category.primary;
    if (modified[i].iso_currency_code === undefined || added[i].iso_currency_code === null) {
      const accountInfos = GetLocalInstitutionAccountInfo(institutionName);
      const accountInfo = accountInfos.find(account => account.id === modified[i].account_id);
      modified[i].iso_currency_code = accountInfo.currencyCode;
    }
    transactionInfo.currencyCode = modified[i].iso_currency_code;
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

export const GetTransactionCursor = (institutionName) => {
  const cursorKey = transactionInfo_base + institutionName + '_cursor';
  return storage.getString(cursorKey);
};

export const GetTransactionHistoryByAccountId = (institutionName, accountId) => {
  const tableName = getTransactionTableName(institutionName);
  let transactionInfoList = JSON.parse(storage.getString(tableName));
  let transactionHistory = transactionInfoList.filter((transaction) => transaction.accountId === accountId);
  transactionHistory.sort((a, b) => b.date.localeCompare(a.date));
  return transactionHistory;
};

export const GetTransactionHistoryByMonth = (institutionName, year, month) => {
  month = ('0' + month).slice(-2);
  const tableName = getTransactionTableName(institutionName);
  let transactionInfoList = JSON.parse(storage.getString(tableName));
  let transactionHistory = transactionInfoList.filter((transaction) => transaction.date.includes(year + '-' + month));
  return transactionHistory;
};

export const GetExpenseTransactionHistoryByMonth = (institutionName, year, month) => {
  month = ('0' + month).slice(-2);
  const tableName = getTransactionTableName(institutionName);
  let transactionInfoList = JSON.parse(storage.getString(tableName));
  let transactionHistory = transactionInfoList.filter((transaction) => transaction.date.includes(year + '-' + month) && transaction.amount < 0);
  return transactionHistory;
};

export const GetExpenseByMonth = (year, month) => {
  month = ('0' + month).slice(-2);
  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetTransactionHistoryByMonth(institutionName, year, month));
  });
  transactionHistory = transactionHistory.filter((transaction) => transaction.date.includes(year + '-' + month) && transaction.amount < 0);
  transactionHistory.forEach((transaction) => {
    if (transaction.currencyCode !== 'CAD') {
      transaction.amount = ConvertToCAD(transaction.currencyCode, transaction.amount);
    }
  });
  let totalExpense = 0;
  transactionHistory.forEach((transaction) => {
    totalExpense += transaction.amount;
  });

  totalExpense = Math.abs(totalExpense);
  totalExpense = Math.round(totalExpense * 100) / 100;
  return totalExpense;
};

export const GetIncomeByMonth = (year, month) => {

  month = ('0' + month).slice(-2);

  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetTransactionHistoryByMonth(institutionName, year, month));
  });
  transactionHistory = transactionHistory.filter((transaction) => transaction.date.includes(year + '-' + month) && transaction.amount > 0);
  transactionHistory.forEach((transaction) => {
    if (transaction.currencyCode !== 'CAD') {
      transaction.amount = ConvertToCAD(transaction.currencyCode, transaction.amount);
    }
  });
  let totalIncome = 0;
  transactionHistory.forEach((transaction) => {
    totalIncome += transaction.amount;
  });
  totalIncome = Math.round(totalIncome * 100) / 100;
  return totalIncome;
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

export const EditBudgetItem = (budgetName, budget) => {
  budgetName = budgetName.replace(' ', '_');
  budgetName = budgetName.toUpperCase();
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));

    let index = budgetList.map(budgetItem => budgetItem.name).indexOf(budgetName);
    if (index > -1) {
      budgetList[index].budget = budget;
    }
    storage.set(budgetInfo, JSON.stringify(budgetList));
  }
};

export const DeleteBudgetItem = (budgetName) => {
  budgetName = budgetName.replace(' ', '_');
  budgetName = budgetName.toUpperCase();
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));
    let index = budgetList.map(budgetItem => budgetItem.name).indexOf(budgetName);
    if (index > -1) {
      budgetList.splice(index, 1);
    }
    storage.set(budgetInfo, JSON.stringify(budgetList));
  }
};

export const GetBudgetList = () => {
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));
  }

  budgetList.forEach((budgetItem) => {
    budgetItem.name = budgetItem.name.replace('_', ' ');
    budgetItem.name = budgetItem.name.charAt(0).toUpperCase() + budgetItem.name.slice(1).toLowerCase();
  });

  return budgetList;
};

export const getBudgetInfo = (year, month) => {
  month = ('0' + month).slice(-2);
  let budgetList = [];
  if (storage.contains(budgetInfo)) {
    budgetList = JSON.parse(storage.getString(budgetInfo));
  }

  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetExpenseTransactionHistoryByMonth(institutionName, year, month));
  });
  budgetList.forEach((budgetItem) => {
    let transactionHistoryByACategory = transactionHistory.filter((transaction) => transaction.category === budgetItem.name);
    transactionHistoryByACategory.forEach((transaction) => {
      if (transaction.currencyCode !== 'CAD') {
        transaction.amount = ConvertToCAD(transaction.currencyCode, transaction.amount);
      }
    });
    let totalAmount = 0;
    transactionHistoryByACategory.forEach((transaction) => {
      totalAmount += transaction.amount;
    });
    totalAmount = Math.abs(totalAmount);
    budgetItem.amount = totalAmount;
    budgetItem.name = budgetItem.name.replace('_', ' ');
    budgetItem.name = budgetItem.name.charAt(0).toUpperCase() + budgetItem.name.slice(1).toLowerCase();
  });

  return budgetList;
};

export const GetExpenseCategoryList = (year, month) => {
  month = ('0' + month).slice(-2);
  let institutionNameList = GetInstitutionNameList();
  let transactionHistory = [];
  institutionNameList.forEach((institutionName) => {
    transactionHistory = transactionHistory.concat(GetExpenseTransactionHistoryByMonth(institutionName, year, month));
  });

  transactionHistory.forEach((transaction) => {
    if (transaction.currencyCode !== 'CAD') {
      transaction.amount = ConvertToCAD(transaction.currencyCode, transaction.amount);
    }
  });

  let categoryList_temp = transactionHistory.reduce((categoryListSofar, { category, amount }) => {
    if (!categoryListSofar[category]) { categoryListSofar[category] = 0; }
    categoryListSofar[category] += amount;
    return categoryListSofar;
  }, {});
  let categoryList = [];

  for (const [key, value] of Object.entries(categoryList_temp)) {
    let categoryName = key;
    categoryName = categoryName.replace('_', ' ');
    categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
    categoryList.push({ category: categoryName, amount: Math.abs(value) });
  }

  return categoryList;
};

export const getTotalBalanceByCurrency = () => {
  let institutionNameList = GetInstitutionNameList();
  let accountInfoAll = [];
  institutionNameList.forEach((institutionName) => {
    let accountInfo = GetLocalInstitutionAccountInfo(institutionName);
    accountInfoAll = accountInfoAll.concat(accountInfo.filter(account => account.type === 'depository'));
  });

  let accountInfoGroup = accountInfoAll.reduce((accountInfoGroupSofar, { currencyCode, balance }) => {
    if (!accountInfoGroupSofar[currencyCode]) { accountInfoGroupSofar[currencyCode] = []; }
    accountInfoGroupSofar[currencyCode].push({ balance });
    return accountInfoGroupSofar;
  }, {});

  let totalBalance = [];

  for (const [key, value] of Object.entries(accountInfoGroup)) {
    let totalBalance_temp = 0;
    value.forEach(v => { totalBalance_temp += v.balance; });
    totalBalance.push({ currency: key, balance: totalBalance_temp });
  }

  return totalBalance;
};

export const updateExchangedRate = (rateList) => {
  let exchange_rate_list = [];
  if (storage.contains(exchanged_rate)) {
    exchange_rate_list = JSON.parse(storage.getString(exchanged_rate));
  }

  rateList.forEach(rateItem => {
    if (exchange_rate_list.filter(rate => rate.to_currency === rateItem.currency).length > 0) {
      exchange_rate_list.find(rate => rate.to_currency === rateItem.currency).rate = rateItem.rate;
    } else {
      exchange_rate_list.push(new ExchangeRate(rateItem.currency, rateItem.rate));
    }
  });

  storage.set(exchanged_rate, JSON.stringify(exchange_rate_list));
};

export const getExchangeRate = (currency) => {
  if (currency === undefined) { return 1; }
  let exchange_rate_list = [];
  if (storage.contains(exchanged_rate)) {
    exchange_rate_list = JSON.parse(storage.getString(exchanged_rate));
  }
  return exchange_rate_list.find(rate => rate.to_currency === currency).rate;
};

function ConvertToCAD(currency, amount) {
  return amount * getExchangeRate(currency);
}


function getAccountTableName(institutionName) {
  return accountInfo_base + institutionName;
}

function getTransactionTableName(institutionName) {
  return transactionInfo_base + institutionName;
}




export default {
  AddInstitutionToken,
  GetInstitutionToken,
  GetInstitutionNameList,
  AsyncInstitutionAccountInfo,
  GetLocalInstitutionAccountInfo,
  UpdateTransactionInfo,
  Test,
  AddBudgetItem,
  EditBudgetItem,
  getBudgetInfo,
  getTotalBalanceByCurrency,
  updateExchangedRate,
  getExchangeRate,
  GetTransactionCursor,
  UpdateAccountBalance,
  DeleteBudgetItem,
  GetBudgetList,
  GetIncomeByMonth,
  GetExpenseByMonth,
  GetExpenseCategoryList,
  ConvertToCAD,
};
