import { AccountTransaction } from "@/contexts/AccountInfoContext";
import { sleep } from "@/utils/sleep";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createTransaction({
  addTransaction,
  data,
}: {
  addTransaction: (newTransaction: AccountTransaction) => Promise<any>;
  data: AccountTransaction;
}) {
  await sleep(100);
  return addTransaction(data);
}

const useCreateTransaction = ({
  addTransaction,
}: {
  addTransaction: (newTransaction: AccountTransaction) => Promise<any>;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: AccountTransaction) => createTransaction({ addTransaction, data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });

  return mutation;
};

export default useCreateTransaction;
