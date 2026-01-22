type BaseDepositStatusReponse = {
  status: "FOUND";
  data: {
    status: string;
  };
};

type DepositStatusNotFoundResponse = BaseDepositStatusReponse & {
  status: "NOT_FOUND";
  data: null;
};

type DepositStatusAcceptedReponse = BaseDepositStatusReponse & {
  status: "FOUND";
  data: {
    depositId: string;
    status: "ACCEPTED";
    amount: string;
    currency: string;
    country: string;
    payer: {
      type: string;
      accountDetails: {
        phoneNUmber: string;
        provider: string;
      };
    };
    customerMessage: string;
    clientReferenceId: string;
    created: string;
    metadata: object;
  };
};

type DepositStatusProcessingReponse = BaseDepositStatusReponse & {
  status: "FOUND";
  data: {
    depositId: string;
    status: "PROCESSING";
    amount: string;
    currency: string;
    country: string;
    payer: {
      type: string;
      accountDetails: {
        phoneNUmber: string;
        provider: string;
      };
    };
    customerMessage: string;
    clientReferenceId: string;
    created: string;
    metadata: object;
  };
};

type DepositStatusInReconciliationReponse = BaseDepositStatusReponse & {
  status: "FOUND";
  data: {
    depositId: string;
    status: "IN_RECONCILIATION";
    amount: string;
    currency: string;
    country: string;
    payer: {
      type: string;
      accountDetails: {
        phoneNUmber: string;
        provider: string;
      };
    };
    customerMessage: string;
    clientReferenceId: string;
    created: string;
    metadata: object;
  };
};

type DepositStatusFailedReponse = BaseDepositStatusReponse & {
  status: "FOUND";
  data: {
    depositId: string;
    status: "FAILED";
    amount: string;
    currency: string;
    country: string;
    payer: {
      type: string;
      accountDetails: {
        phoneNUmber: string;
        provider: string;
      };
    };
    customerMessage: string;
    clientReferenceId: string;
    created: string;
    failureReason: {
      failureCode: string;
      failureMessage: string;
    };
    metadata: object;
  };
};

export type DepositStatusResponse_v2 =
  | DepositStatusNotFoundResponse
  | DepositStatusAcceptedReponse
  | DepositStatusProcessingReponse
  | DepositStatusInReconciliationReponse
  | DepositStatusFailedReponse;

export type DepositCallBack_v2 = {
  /**
   *  @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *  Required string length: 36
   *  @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
   */
  depositId: string;

  /**
   * @description The final status of the payment.
   * COMPLETED - The payment has been successfully processed.
   * PROCESSING - Only sent for providers with authorisation type REDIRECT_AUTH. See auhtorizationUrl.
   * FAILED - The payment request has been proceessed, but failed.
   * Available options: `COMPLETED`, `FAILED`, `PROCESSING`
   */
  status: "COMPLETED" | "PROCESSING" | "FAILED";

  amount: string;
  /**
   * @description The currency in which the amount is specified.
   *
   * Format must be the ISO 4217 three character currency code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes  |Wikipedia}.
   *
   * You can find all the supported currencies that the specific correspondent supports {@link https://docs.pawapay.io/using_the_api#correspondents | from here}.
   *
   * The {@link https://docs.pawapay.io/v1/api-reference/toolkit/active-configuration | active configuration} endpoint provides the list of correspondents configured for your account together with the currencies.
   *
   * @example Example: "MWK"
   */
  currency: string;
  /**
   * The country in which the payment was initiated.
   * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes | Wikipedia}.
   *
   * Required string length: 3
   *
   * @example "MWK"
   */
  country: string;
  payer: {
    type: "MMO";
    accountDetails: {
      phoneNumber: "260763456789";
      provider: "MTN_MOMO_ZMB";
    };
  };
  created: "2020-02-21T17:32:29Z";
  customerMessage: "Note of 4 to 22 chars";
  providerTransactionId: "ABC123";
  failureReason: {
    failureCode: "INSUFFICIENT_BALANCE";
    failureMessage: "The customer does not have enough funds to complete this payment.";
  };
  metadata: {
    orderId: "ORD-123456789";
    customerId: "customer@email.com";
  };
};

export type DepositConfig_v2 = {
  depositId: string;
  payer: {
    type: "MMO";
    accountDetails: {
      phoneNumber: string;
      provider: string;
    };
  };
  amount: string;
  currency: string;
  preAuthorisationCode?: string;
  clientReferenceId?: string;
  customerMessage?: string;
  metadata: object[];
};

type BaseDepositResponse = {
  depositId: string;
  status: string;
};

type AcceptedDepositResponse = BaseDepositResponse & {
  status: "ACCEPTED";
  created: string;
};

type DepositIgnoredResponse = BaseDepositResponse & {
  status: "DUPLICATE_IGNORED";
  created: string;
};

type ProviderTemporaryUnavailableResponse = BaseDepositResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "PROVIDER_TEMPORARILY_UNAVAILABLE";
    failureMessage: string;
  };
};

type InvalidPhoneNumberResponse = BaseDepositResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "INVALID_PHONE_NUMBER";
    failureMessage: string;
  };
};

type InvalidCurrencyResponse = BaseDepositResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "INVALID_CURRENCY";
    failureMessage: string;
  };
};

type InvalidAmountResponse = BaseDepositResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "INVALID_AMOUNT";
    failureMessage: string;
  };
};

type AmountOutOfBoundsResponse = BaseDepositResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "AMOUNT_OUT_OF_BOUNDS";
    failureMessage: string;
  };
};

export type DepositResponse_v2 =
  | AcceptedDepositResponse
  | DepositIgnoredResponse
  | ProviderTemporaryUnavailableResponse
  | InvalidPhoneNumberResponse
  | InvalidCurrencyResponse
  | InvalidAmountResponse
  | AmountOutOfBoundsResponse;

type BaseDepositResendCallbackResponse = {
  depositId: string;
  status: string;
};

type DepositResendCallbackAcceptedResponse =
  BaseDepositResendCallbackResponse & {
    status: "ACCEPTED";
  };

type DepositResendCallbackInvalidStateResponse =
  BaseDepositResendCallbackResponse & {
    status: "REJECTED";
    failureReason: {
      failureCode: "INVALID_STATE";
      failureMessage: string;
    };
  };

type DepositResendCallbackNotFoundResponse =
  BaseDepositResendCallbackResponse & {
    status: "REJECTED";
    failureReason: {
      failureCode: "NOT_FOUND";
      failureMessage: string;
    };
  };

export type ResendDepositCallbackResponse_v2 =
  | DepositResendCallbackAcceptedResponse
  | DepositResendCallbackInvalidStateResponse
  | DepositResendCallbackNotFoundResponse;
