import { sleep } from "@/utils/sleep";
import { useQuery } from "@tanstack/react-query";

const getRecipientInfo = async ({
  accountNumber,
  name,
  bank,
}: {
  accountNumber: string;
  bank: string;
  name: string;
}) => {
  await sleep(100);
  return { accountNumber, name, bank };
};

export const useGetRecipientInfo = ({ accountNumber, bank }: { accountNumber: string; bank: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["recipient-info", accountNumber],
    queryFn: () => getRecipientInfo({ accountNumber, bank, name: "JOHN DOE" }),
    enabled: !!accountNumber,
  });

  return { data, isLoading };
};
