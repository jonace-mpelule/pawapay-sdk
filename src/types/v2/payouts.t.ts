export type ResendPayoutCallbackResponse_v2 =
  | {
      remittanceId: string;
      status: "ACCEPTED";
    }
  | {
      remittanceId: string;
      status: "REJECTED";
      failureReason: {
        failureCode: "NOT_FOUND" | "INVALID_STATE";
        failureMessage: string;
      };
    };

export type CancelEnqueuedPayoutResponse_v2 =
  | {
      remittanceId: string;
      status: "ACCEPTED";
    }
  | {
      remittanceId: string;
      status: "REJECTED";
      failureReason: {
        failureCode: "NOT_FOUND" | "INVALID_STATE";
        failureMessage: string;
      };
    };

export type RequestPayoutConfig_v2 = {
  payoutId: string;
  recipient: {
    type: "MMO";
    accountDetails: {
      phoneNumber: string;
      provider: string;
    };
  };
  amount: string;
  currency: string;
  clientReferenceId: string;
  customerMessage: string;
  metadata: Array<Record<string, unknown>>;
};

export type RequestPayoutResponse_v2 =
  | {
      payoutId: string;
      status: "ACCEPTED" | "DUPLICATE_IGNORED";
      created: string;
    }
  | {
      payoutId: string;
      status: "REJECTED";
      failureReason: {
        failureCode:
          | "PROVIDER_TEMPORARILY_UNAVAILABLE"
          | "INVALID_PHONE_NUMBER"
          | "INVALID_CURRENCY"
          | "INVALID_AMOUNT"
          | "AMOUNT_OUT_OF_BOUNDS";
        failureMessage: string;
      };
    };

type CheckPayoutData_v2 = {
  payoutId: string;
  amount: string;
  currency: string;
  country: string;
  recipient: {
    type: "MMO";
    accountDetails: {
      phoneNumber: string;
      provider: string;
    };
  };
  clientReferenceId: string;
  customerMessage: string;
  created: string;
  metadata: object;
} & (
  | { status: "COMPLETED"; providerTransactionId: string }
  | {
      status: "FAILED";
      failureReason: {
        failureCode: "RECIPIENT_NOT_FOUND";
        failureMessage: string;
      };
    }
  | { status: "ACCEPTED" | "PROCESSING" | "IN_RECONCILIATION" }
);

export type CheckPayoutStatus_v2 =
  | { status: "FOUND"; data: CheckPayoutData_v2 }
  | { status: "NOT_FOUND" };

export type BulkPayoutResponse_v2 = (
  | {
      payoutId: string;
      status: "ACCEPTED" | "DUPLICATE_IGNORED";
      created: string;
    }
  | {
      payoutId: string;
      status: "REJECTED";
      failureReason: {
        failureCode: string;
        failureMessage: string;
      };
    }
)[];
