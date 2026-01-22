export type InitiateRemittanceConfig = {
  remittanceId: string;
  recipient: {
    type: string;
    accountDetails: {
      phoneNumber: string;
      provider: string;
    };
    recipientDetails: {
      firstName: string;
      lastName: string;
    };
  };
  sender: {
    transactionDetails: {
      transactionReference: string;
      originalAmount: string;
      originalCurrency: string;
      buyFxRate: string;
      senderFees: string;
      purposeOfFunds: string;
      sourceOfFunds: string;
    };
    senderDetails: {
      firstName: string;
      lastName: string;
      nationality: string;
      phoneNumber: string;
      address: {
        addressLine: string;
        postalCode: string;
        city: string;
        country: string;
      };
      identification: {
        type: string;
        number: string;
      };
      gender: string;
      dateOfBirth: string;
      placeOfBirth: string;
      occupation: string;
      relationshipRecipient: string;
    };
  };
  amount: string;
  currency: string;
  customerMessage: string;
  metadata: Array<Record<string, unknown>>;
};

export type InitiateRemittanceResponse =
  | {
      remittanceId: string;
      status: "ACCEPTED" | "DUPLICATE_IGNORED";
      created: string;
    }
  | {
      remittanceId: string | null;
      status: "REJECTED";
      failureReason: {
        failureCode: string;
        failureMessage: string;
      };
    };

export type RemittanceCallback = {
  remittanceId: string;
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
    recipientDetails: {
      firstName: string;
      lastName: string;
    };
  };
  sender: {
    transactionDetails: {
      transactionReference: string;
      originalAmount: string;
      originalCurrency: string;
      buyFxRate: string;
      senderFees: string;
      purposeOfFunds: string;
      sourceOfFunds: string;
    };
    senderDetails: {
      firstName: string;
      lastName: string;
      nationality: string;
      phoneNumber: string;
      address: {
        addressLine: string;
        postalCode: string;
        city: string;
        country: string;
      };
      identification: {
        type: string;
        number: string;
      };
      gender: string;
      dateOfBirth: string;
      placeOfBirth: string;
      occupation: string;
      relationshipRecipient: string;
    };
  };
  created: string;
  customerMessage: string;
  providerTransactionId: string;
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  metadata: {
    orderId: string;
    customerId: string;
  };
};

export type CancelEnqueuedRemittanceResponse =
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

export type CheckRemittanceStatusResponse =
  | {
      status: "FOUND";
      data:
        | {
            remittanceId: string;
            status: "COMPLETED";
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
            customerMessage: string;
            created: string;
            providerTransactionId: string;
            metadata: {
              orderId: string;
              customerId: string;
            };
          }
        | {
            remittanceId: string;
            status: "ACCEPTED" | "PROCESSING" | "IN_RECONCILIATION";
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
            customerMessage: string;
            created: string;
            metadata: {
              orderId: string;
              customerId: string;
            };
          }
        | {
            remittanceId: string;
            status: "FAILED";
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
            customerMessage: string;
            created: string;
            failureReason: {
              failureCode: string;
              failureMessage: string;
            };
            metadata: {
              orderId: string;
              customerId: string;
            };
          };
    }
  | {
      status: "NOT_FOUND";
    };

export type ResendRemittanceCallbackResponse =
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
