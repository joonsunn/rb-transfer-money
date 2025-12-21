import { AccountTransaction, useAccountInfoContext } from "@/contexts/AccountInfoContext";
import { sleep } from "@/utils/sleep";
import { useQuery } from "@tanstack/react-query";

const getTransactions = async ({ transactions }: { transactions: AccountTransaction[] }) => {
  await sleep(100);
  return transactions;
};

export const useGetAllTransactions = () => {
  const { transactions } = useAccountInfoContext();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions({ transactions }),
  });

  return { data, isLoading, isFetching };
};
