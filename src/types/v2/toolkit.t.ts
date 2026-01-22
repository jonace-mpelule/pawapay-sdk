export type ProviderAvailability_v2 = Array<{
  country: string;
  providers: Array<{
    provider: string;
    operationTypes: Array<{
      operationType:
        | "DEPOSIT"
        | "PAYOUT"
        | "REMITTANCE"
        | "REFUND"
        | "USSD_DEPOSIT"
        | "NAME_LOOKUP";
      status: "OPERATIONAL" | "DELAYED" | "CLOSED";
    }>;
  }>;
}>;

export type ProviderPrediction_v2 = {
  country: string;
  provider: string;
  phoneNumber: string;
};

export type WalletBalance_v2 = {
  balances: Array<{
    country: string;
    balance: string;
    currency: string;
    provider: string;
  }>;
};
