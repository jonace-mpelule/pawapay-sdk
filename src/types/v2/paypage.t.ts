export type RequestPayPageConfig_v2 = {
  depositId: string;
  returnUrl: string;
  customerMessage: string;
  amountDetails: { amount: string; currency: string };
  phoneNumber: string;
  language: string;
  country: string;
  reason: string;
  metadata: Array<Record<string, unknown>>;
};
