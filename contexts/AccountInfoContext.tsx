import { createContext, PropsWithChildren, use, useState } from "react";

const defaultAccountBalanceContext = {
  accountBalance: 20000,
  setAccountBalance: () => {},
  transactions: [],
  addTransaction: () => ({}),
};

type AccountInfoContextType = {
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  transactions: AccountTransaction[];
  addTransaction: (newTransaction: AccountTransaction) => { error?: string; message?: string };
};

const AccountInfoContext = createContext<AccountInfoContextType>(defaultAccountBalanceContext);

export function AccountInfoContextProvider({ children }: PropsWithChildren) {
  const [accountBalance, setAccountBalance] = useState<number>(defaultAccountBalanceContext.accountBalance);

  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);

  function addTransaction(newTransaction: AccountTransaction): { error?: string; message?: string } {
    const newAccountBalance = accountBalance - newTransaction.toAmount;
    if (newAccountBalance < 0) {
      return { error: "Insufficient account balance" };
    }
    setAccountBalance(newAccountBalance);
    const newTransactions = [newTransaction, ...transactions].sort(
      (a, b) => b.dateTime.valueOf() - a.dateTime.valueOf()
    );
    setTransactions(newTransactions);

    return { message: "success" };
  }

  return (
    <AccountInfoContext value={{ accountBalance, setAccountBalance, transactions, addTransaction }}>
      {children}
    </AccountInfoContext>
  );
}

export const useAccountInfoContext = () => {
  const context = use(AccountInfoContext);

  if (!context) {
    throw new Error("useAccountInfoContext can only be used within an AccountInfoContextProvider");
  }

  return context;
};

export type AccountTransaction = {
  id: string;
  toAccountNumber: string;
  toAmount: number;
  toBank: string;
  dateTime: Date;
  note: string;
};
