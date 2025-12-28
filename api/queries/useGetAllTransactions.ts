import { AccountTransaction, useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { sleep } from "@/utils/sleep";
import { useQuery } from "@tanstack/react-query";

// TODO: replace with actual network request using axios or fetch
const getTransactions = async ({ transactions }: { transactions: AccountTransaction[] }) => {
  await sleep(100);
  return transactions;
};

// TODO: pagination, or set to grab only latest # number of transactions
export const useGetAllTransactions = () => {
  const { transactions } = useAccountInfoContext();

  const { data, isLoading, isFetching, refetch, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions({ transactions }),
  });

  return { data, isLoading, isFetching, refetch, error };
};
