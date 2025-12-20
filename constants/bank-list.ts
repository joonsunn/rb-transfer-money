export const BankList = [
  {
    label: "Ryt Bank",
    value: "ryt-bank",
    color: "white",
    backgroundColor: "#1516c5",
  },
  {
    label: "Maybank",
    value: "maybank",
    color: "black",
    backgroundColor: "#F9BC1D",
  },
  {
    label: "CIMB Bank",
    value: "cimb",
    color: "white",
    backgroundColor: "#770F1C",
  },
];

export type BankListOption = (typeof BankList)[number];
