export type RequestRefundConfig_v2 = {
  refundId: string;
  depositId: string;
  amount: string;
  currency: string;
  clientReferenceId: string;
  metadata: Array<Record<string, unknown>>;
};

export type RequestRefundResponse_v2 =
  | {
      refundId: string;
      status: "ACCEPTED";
      created: string;
    }
  | {
      refundId: string;
      status: "DUPLICATE_IGNORED";
      created: string;
    }
  | {
      refundId: string;
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

export type RefundStatusResponse_v2 =
  | {
      status: "FOUND";
      data: {
        refundId: string;
        status: "COMPLETED" | "ACCEPTED";
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
        providerTransactionId?: string;
        metadata: {
          orderId: string;
          customerId: string;
        };
      };
    }
  | {
      status: "NOT_FOUND";
    };

export type ResendRefundCallbackResponse_v2 =
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

export type RefundCallback = {
  refundId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  recipient: {
    type: string;
    accountDetails: {
      phoneNumber: string;
      provider: string;
    };
  };
  created: string;
  customerMessage: string;
  providerTransactionId: string;
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  metadata: Array<Record<string, string>>;
};
