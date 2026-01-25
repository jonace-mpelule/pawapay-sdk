//#region src/types/v2/deposits.t.d.ts
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
type DepositStatusResponse_v2 = DepositStatusNotFoundResponse | DepositStatusAcceptedReponse | DepositStatusProcessingReponse | DepositStatusInReconciliationReponse | DepositStatusFailedReponse;
type DepositCallBack_v2 = {
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
  metadata: Record<string, unknown>;
};
type DepositConfig_v2 = {
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
type DepositResponse_v2 = AcceptedDepositResponse | DepositIgnoredResponse | ProviderTemporaryUnavailableResponse | InvalidPhoneNumberResponse | InvalidCurrencyResponse | InvalidAmountResponse | AmountOutOfBoundsResponse;
type BaseDepositResendCallbackResponse = {
  depositId: string;
  status: string;
};
type DepositResendCallbackAcceptedResponse = BaseDepositResendCallbackResponse & {
  status: "ACCEPTED";
};
type DepositResendCallbackInvalidStateResponse = BaseDepositResendCallbackResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "INVALID_STATE";
    failureMessage: string;
  };
};
type DepositResendCallbackNotFoundResponse = BaseDepositResendCallbackResponse & {
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND";
    failureMessage: string;
  };
};
type ResendDepositCallbackResponse_v2 = DepositResendCallbackAcceptedResponse | DepositResendCallbackInvalidStateResponse | DepositResendCallbackNotFoundResponse;
//#endregion
//#region src/types/index.t.d.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: <'can use any'> */
interface PawaPayResponse<T = any, E = any> {
  success: boolean;
  data?: T;
  status?: number;
  error?: E;
  headers?: any;
}
interface RequestOptions {
  timeout?: number;
  headers?: Record<string, string>;
}
type DepositConfig = {
  /**
   *  @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *  Required string length: 36
   *  @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
   */
  depositId: string;
  /**
  * @description The amount to be collected (deposit) or disbursed (payout or refund).
  *
  * Amount must follow below requirements or the request will be rejected:
  *
  * Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
  * The minimum and maximum amount depends on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
  * Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
  * Trailing zeroes are permitted.
  *
  * Valid examples:
  *
  * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
  *
  * Not valid examples:
  *
  * @ 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
  *
  * Required string length: 1 - 23
  *
  * @example Example: "15"
     */
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
   * @description The country in which the MMO operates.
   *
   * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
   *
   * @example Example: "MWI"
   */
  country?: string;
  /**
   * @description The correspondent code refers to the specific MMO that the specified phone number (MSISDN) has an active mobile money wallet with.
   *
   * You can find all the supported correspondents {@link https://docs.pawapay.io/using_the_api#correspondents | listed here}.
   *
   * The {@link https://docs.pawapay.io/v1/api-reference/toolkit/active-configuration | active configuration} endpoint provides the list of correspondents configured for your account.
   *
   * You can use the {@link https://docs.pawapay.io/v1/api-reference/toolkit/predict-correspondent | predict correspondent} enpoint to predict the correct correspondent to use based on the phone number (MSISDN).
   *
   * @example
   * Example: "AIRTEL_MWI"
   */
  correspondent: string;
  /**
   * @description The phone number (MSISDN) of the recipient or payer must be specified as the `value` of the `address`.
   */
  payer: {
    /** @description The type of financial address. At the moment, only MSISDN is supported as the financial address.
     * @example
     * {
     *  type: "MSISDN"
     * }
     */
    type: "MSISDN" & string;
    /**
     * @description The phone number (MSISDN) of the payer or recipient.
     *
     * The format is described in {@link https://en.wikipedia.org/wiki/MSISDN | Wikipedia}.
     *
     * MSISDN validation has following rules:
     *
     * - Only digits without whitespaces or any other separators or prefixes like '+'
     * - Should not start with zero.
     * - Country code is mandatory.
     * - Should not exceed or be less than the valid length of specified country.
     * - Valid examples for Malawi: 265999123456
     *
     * Not valid examples for Malawi:
     * +265999123456, +2650999123456, 265 999 123 456, 265-9991-23456, 0265999123456,
     *
     * @example {value: "265 999 123 678"}
     *
     */
    address: {
      value: string;
    };
  };
  /**
   * @description The timestamp of when the deposit was created in the pawaPay platform.
   *
   * Format defined by 'date-time' in RFC3339 section 5.6 from {@link https://tools.ietf.org/html/rfc3339#section-5.6 | IETF}
   *
   * @example Example:"2020-02-21T17:32:28Z"
   */
  customerTimestamp: string;
  /**
   * @description Short description for the transaction.
   *
   * Depending on the specific MMO performing the transaction this message may be visible to the customer in the SMS receipt or within their transaction history.
   *
   * Must be between 4 and 22 alphanumeric characters.
   *
   * Required string length: 4 - 22
   *
   * @example Example: "Note of 4 to 22 chars"
   */
  statementDescription: string;
  /**
   * @description For MMOs (correspondents) that use a preauthorisation code instead of a PIN prompt for authorising the deposit.
   *
   * Required string length: 1 - 36
   */
  preAuthorisationCode?: string;
  /**
   * @description A list of metadata that you can attach to the payment for providing additional context about the payment.
   *
   * For example, adding orderId to indicate for which order this payment was for or customerId to know which customer this payment pertains to.
   *
   * Metadata will not be visible to the customer that is party to this payment.
   * It will be visible in the pawaPay Dashboard on the payment details page and in your financial statements as a JSON object to support automated reconciliation.\
   * It is also possible to search for recent payments in the pawaPay Dashboard using global search based on the values of metadata.
   *
   * Up to 10 metadata fields can be attached to a payment.
   *
   *
   * @param {string} metadata.fieldName - The name of the metadata that you are attaching to the payment.
   * @example {fieldName: "orderId"}
   *
   *
   * @param {string} metadata.metadata.fieldValue - The value for this metadata field
   * @example {fieldValue: "ORD-123456789"}
   *
   *
   * @param {boolean} metadata.isPII - Indicates whether the field contains personally identifiable information. Used for enabling compliance with GDPR or other relevant data privacy laws.
   * @example {isPII: true}
   */
  metadata?: Array<{
    fieldName: string;
    fieldValue: string;
    isPII?: boolean;
  }>;
};
type DepositCallback = {
  /**
   *  @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *  Required string length: 36
   *  @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
   */
  depositId: string;
  /**
   * @description The final status of the payment.
   * COMPLETED - The payment has been successfully processed.
   * FAILED - The payment request has been proceessed, but failed.
   * Available options: `COMPLETED`, `FAILED`
   */
  status: string;
  /**
  * @description The amount to be collected or disbursed.
  *
  * Amount must follow below requirements or the request will be rejected:
  *
  * Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
  * The minimum and maximum amount depends on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
  * Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
  * Trailing zeroes are permitted.
  *
  * Valid examples:
  *
  * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
  *
  * Not valid examples:
  *
  * @ 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
  *
  * Required string length: 1 - 23
  *
  * @example Example: "15"
     */
  requestedAmount: string;
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
   * @description The country in which the MMO operates.
   *
   * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
   *
   * @example Example: "MWI"
   */
  country: string;
  /**
   * @description The correspondent code refers to the specific MMO that the specified phone number (MSISDN) has an active mobile money wallet with.
   *
   * You can find all the supported correspondents {@link https://docs.pawapay.io/using_the_api#correspondents | listed here}.
   *
   * The {@link https://docs.pawapay.io/v1/api-reference/toolkit/active-configuration | active configuration} endpoint provides the list of correspondents configured for your account.
   *
   * You can use the {@link https://docs.pawapay.io/v1/api-reference/toolkit/predict-correspondent | predict correspondent} enpoint to predict the correct correspondent to use based on the phone number (MSISDN).
   *
   * @example
   * Example: "AIRTEL_MWI"
   */
  correspondent: string;
  /**
   * @description The phone number (MSISDN) of the recipient or payer must be specified as the `value` of the `address`.
   */
  payer: {
    /** @description The type of financial address. At the moment, only MSISDN is supported as the financial address.
     * @example
     * {
     *  type: "MSISDN"
     * }
     */
    type: "MSISDN" & string;
    /**
     * @description The phone number (MSISDN) of the payer or recipient.
     *
     * The format is described in {@link https://en.wikipedia.org/wiki/MSISDN | Wikipedia}.
     *
     * MSISDN validation has following rules:
     *
     * - Only digits without whitespaces or any other separators or prefixes like '+'
     * - Should not start with zero.
     * - Country code is mandatory.
     * - Should not exceed or be less than the valid length of specified country.
     * - Valid examples for Malawi: 265999123456
     *
     * Not valid examples for Malawi:
     * +265999123456, +2650999123456, 265 999 123 456, 265-9991-23456, 0265999123456,
     *
     * @example {value: "265 999 123 678"}
     *
     */
    address: {
      value: string;
    };
  };
  /**
   * @description The timestamp of when the deposit was created in the pawaPay platform.
   *
   * Format defined by 'date-time' in RFC3339 section 5.6 from {@link https://tools.ietf.org/html/rfc3339#section-5.6 | IETF}
   *
   * @example Example:"2020-02-21T17:32:28Z"
   */
  customerTimestamp: string;
  /**
   * @description Short description for the transaction.
   *
   * Depending on the specific MMO performing the transaction this message may be visible to the customer in the SMS receipt or within their transaction history.
   *
   * Must be between 4 and 22 alphanumeric characters.
   *
   * Required string length: 4 - 22
   *
   * @example Example: "Note of 4 to 22 chars"
   */
  statementDescription: string;
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
  /**
  * @description The amount to be collected or disbursed.
  *
  * Amount must follow below requirements or the request will be rejected:
  *
  * Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
  * The minimum and maximum amount depends on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
  * Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
  * Trailing zeroes are permitted.
  *
  * Valid examples:
  *
  * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
  *
  * Not valid examples:
  *
  * @ 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
  *
  * Required string length: 1 - 23
  *
  * @example Example: "15"
     */
  depositedAmount: string;
  /**
   * @description When the MNO responded to this deposit request.
   * Format defined by 'date-time' in RFC3339 section 5.6 (https://tools.ietf.org/html/rfc3339#section-5.6)
   *
   * Example: "2020-02-21T17:32:30Z"
   */
  respondedByPayer: string;
  /**
   * @description The unqiue ID for this financial transaction assigned by the MNO.
   */
  correspondentIds: Record<string, string>;
  suspiciousActivityReport: {
    activityTypw: string;
    comment: string;
  }[];
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  metadata: Record<string, unknown>;
};
type RequestPayoutConfig = {
  /**
   * @description A UUIDv4 based ID specified by you, that uniquely identifies the payout.
   * Required string length: 36
   * @example payoutId: "<INSERT_UUID_FOR_PAYOUT>"
   */
  payoutId: string;
  /**
   * @description The amount to be disbursed for the payout.
   *
   * Amount must follow the same requirements as in DepositConfig.
   * Valid examples: 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
   * Not valid examples: 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
   * Required string length: 1 - 23
   * @example "15"
   */
  amount: string;
  /**
   * @description The currency in which the amount is specified.
   * Format must be the ISO 4217 three character currency code in upper case.
   * @example "MWK"
   */
  currency: string;
  /**
   * @description The correspondent code refers to the specific MMO that the recipient has an active mobile money wallet with.
   * @example "AIRTEL_MWI"
   */
  correspondent: string;
  /**
   * @description The phone number (MSISDN) of the recipient.
   * Format: Only digits, no whitespaces or separators, no leading zero, must include country code.
   * @example "265999123456"
   */
  recipient: string;
  /**
   * @description The timestamp of when the payout was created in the pawaPay platform.
   * Format defined by 'date-time' in RFC3339 section 5.6.
   * @example "2020-02-21T17:32:28Z"
   */
  customerTimestamp: string;
  /**
   * @description Short description for the transaction, visible to the customer in SMS or transaction history.
   * Must be between 4 and 22 alphanumeric characters.
   * @example "Note of 4 to 22 chars"
   */
  statementDescription: string;
  /**
   * @description The country in which the MMO operates. ISO 3166-1 alpha-3 code in upper case.
   * @example "MWI"
   */
  country: string;
  /**
   * @description A list of metadata for providing additional context about the payout. Up to 10 fields allowed.
   * @example [{ fieldName: "orderId", fieldValue: "ORD-123456789", isPII: false }]
   */
  metadata: Array<{
    fieldName: string;
    fieldValue: string;
    isPII?: boolean;
  }>;
};
type BaseRequestPayoutResponse = {
  payoutId: string;
  status: string;
};
type AcceptedRequestPayout = BaseRequestPayoutResponse & {
  status: "ACCEPTED";
  created: string;
};
type DuplicateIgnoredRequestPayout = BaseRequestPayoutResponse & {
  status: "DUPLICATE_IGNORED";
  created: string;
};
type RejectedRequestPayout = BaseRequestPayoutResponse & {
  status: "REJECTED";
  rejectionReason: {
    rejectionCode: string;
    rejectionMessage: string;
  };
};
type RequestPayoutRespose = AcceptedRequestPayout | DuplicateIgnoredRequestPayout | RejectedRequestPayout;
type PayoutCallback = {
  payoutId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  recipient: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  created: string;
  receivedByRecipient: string;
  correspondentIds: Record<string, string>;
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  metadata: Record<string, string>;
};
type CheckPayoutStatusBase = {
  payoutId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  recipient: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  created: string;
  metadata: Record<string, unknown>;
};
type CheckPayoutStatusAccepted = CheckPayoutStatusBase & {
  status: "ACCEPTED";
  created: string;
};
type CheckPayoutStatusCompleted = CheckPayoutStatusBase & {
  status: "COMPLETED";
  receivedByRecipient: string;
  correspondentIds: Record<string, string>;
};
type CheckPayoutStatusSubmitted = CheckPayoutStatusBase & {
  status: "SUBMITTED";
  created: string;
};
type CheckPayoutStatusEnqueued = CheckPayoutStatusBase & {
  status: "ENQUEUED";
  created: string;
};
type CheckPayoutStatusSFailed = CheckPayoutStatusBase & {
  status: "FAILED";
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  created: string;
};
type CheckPayoutStatusResponse = CheckPayoutStatusAccepted | CheckPayoutStatusCompleted | CheckPayoutStatusSubmitted | CheckPayoutStatusEnqueued | CheckPayoutStatusSFailed;
type CancelEnqueuedPayoutBase = {
  payoutId: string;
  status: string;
};
type CancelEnqueuedPayoutAccepted = CancelEnqueuedPayoutBase & {
  status: "ACCEPTED";
  created: string;
};
type CancelEnqueuedPayoutRejected = CancelEnqueuedPayoutBase & {
  status: "REJECTED";
  failureReason: string;
};
type CancelEnqueuedPayoutFailed = CancelEnqueuedPayoutBase & {
  status: "FAILED";
};
type CancelEnqueuedPayoutResponse = CancelEnqueuedPayoutAccepted | CancelEnqueuedPayoutRejected | CancelEnqueuedPayoutFailed;
type RequestBulkPayoutConfig = {
  payoutId: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  recipient: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  metadata: Array<{
    fieldName: string;
    fieldValue: string;
    isPII: boolean;
  }>;
};
type RequestBuildPayoutResponseBase = {
  payoutId: string;
  status: string;
  created: string;
};
type RequestBuildPayoutResponseAccepted = RequestBuildPayoutResponseBase & {
  status: "ACCEPTED";
  created: string;
};
type RequestBuildPayoutResponseDuplicateIgnored = RequestBuildPayoutResponseBase & {
  status: "DUPLICATE_IGNORED";
};
type RequestBuildPayoutResponseRejected = RequestBuildPayoutResponseBase & {
  status: "REJECTED";
  failureReason: {
    rejectionCode: string;
    rejectionMessage: string;
  };
};
type RequestBuildPayoutResponse = RequestBuildPayoutResponseAccepted | RequestBuildPayoutResponseDuplicateIgnored | RequestBuildPayoutResponseRejected;
type ResendPayoutCallbackBase = {
  payoutId: string;
  status: string;
};
type ResendPayoutCallbackAccepted = ResendPayoutCallbackBase & {
  status: "ACCEPTED";
};
type ResendPayoutCallbackRejected = ResendPayoutCallbackBase & {
  status: "REJECTED";
  failureReason: string;
};
type ResendPayoutCallbackFailed = ResendPayoutCallbackBase & {
  status: "FAILED";
};
type ResendPayoutCallbackResponse = ResendPayoutCallbackAccepted | ResendPayoutCallbackRejected | ResendPayoutCallbackFailed;
type RequestPayPageConfig = {
  /**
   * A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *
   * Required string length: 36
   * @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
   */
  depositId: string;
  /**
   * The URL to which the user will be redirected after completion of the operation.
   *
   * @example returnUrl: "https://merchant.com/paymentProcessed"
   */
  returnUrl: string;
  /**
   * @description Short description for the transaction.
   *
   * Depending on the specific MMO performing the transaction this message may be visible to the customer in the SMS receipt or within their transaction history.
   *
   * Must be between 4 and 22 alphanumeric characters.
   *
   * Required string length: 4 - 22
   *
   * @example Example: "Note of 4 to 22 chars"
   */
  statementDescription?: string;
  /**
   * If specified, the amount will be displayed to the customer as the payment amount. For example, when paying for specific goods or services.
   *
   * If not specified, the customer will have to specify the amount they wish to pay. For example, when depositing money into their eWallet.
   *
   * Amount must follow below requirements or the request will be rejected:
   *
   * - Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
   *
   * - The minimum and maximum amounts depend on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
   * - Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
   * - Trailing zeroes are permitted.
   *
   * Valid examples:
   * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
   *
   * Not valid examples:
   * 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
   *
   * Required string length: 1 - 23
   *
   * @example amount: "15"
   */
  amount?: string;
  /**
   * @description The phone number (MSISDN) of the payer or recipient.
   *
   * The format is described in {@link https://en.wikipedia.org/wiki/MSISDN | Wikipedia}.
   *
   * MSISDN validation has following rules:
   *
   * - Only digits without whitespaces or any other separators or prefixes like '+'
   * - Should not start with zero.
   * - Country code is mandatory.
   * - Should not exceed or be less than the valid length of specified country.
   * - Valid examples for Malawi: 265999123456
   *
   * Not valid examples for Malawi:
   * +265999123456, +2650999123456, 265 999 123 456, 265-9991-23456, 0265999123456,
   *
   * @example {value: "265 999 123 678"}
   *
   */
  msisdn: string;
  /**
   * The language in which the Payment Page will be presented to the customer. If the user has explicitly changed their languages preferences, their selection will override this parameter.
   *
   * Available options: EN, FR
   *
   * @example language: "EN"
   */
  language?: string;
  /**
   * @description The country in which the MMO operates.
   *
   * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
   *
   * @example Example: "MWI"
   */
  country?: string;
  /**
   * Optional text which will be displayed to the customer on the payment page to specify what they are paying for.
   *
   * Required string length: 1 - 50
   *
   * @example reason: "Ticket to festival"
   */
  reason?: string;
  /**
   * @description A list of metadata that you can attach to the payment for providing additional context about the payment.
   *
   * For example, adding orderId to indicate for which order this payment was for or customerId to know which customer this payment pertains to.
   *
   * Metadata will not be visible to the customer that is party to this payment.
   * It will be visible in the pawaPay Dashboard on the payment details page and in your financial statements as a JSON object to support automated reconciliation.\
   * It is also possible to search for recent payments in the pawaPay Dashboard using global search based on the values of metadata.
   *
   * Up to 10 metadata fields can be attached to a payment.
   *
   *
   * @param {string} metadata.fieldName - The name of the metadata that you are attaching to the payment.
   * @example {fieldName: "orderId"}
   *
   *
   * @param {string} metadata.metadata.fieldValue - The value for this metadata field
   * @example {fieldValue: "ORD-123456789"}
   *
   *
   * @param {boolean} metadata.isPII - Indicates whether the field contains personally identifiable information. Used for enabling compliance with GDPR or other relevant data privacy laws.
   * @example {isPII: true}
   */
  metadata?: Array<{
    fieldName: string;
    fieldValue: string;
    isPII?: boolean;
  }>;
};
type RequestRefundConfig = {
  /**
   *@description A UUIDv4 based ID specified by you, that uniquely identifies the refund.
   *
   * Required string length: 36
   *
   * @example refundId:"<INSERT_UUID_FOR_REFUND>"
   */
  refundId: string;
  /**
   * @description The depositId of the deposit to be refunded.
   *
   * Required string length: 36
   *
   * @example depositId:"<INSERT_UUID_OF_DEPOSIT_TO_REFUND>"
   */
  depositId: string;
  /**
   * @description The amount to be collected (deposit) or disbursed (payout or refund).
   *
   * Amount must follow below requirements or the request will be rejected:
   *
   * - Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
   *
   * - The minimum and maximum amounts depend on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
   * - Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
   * - Trailing zeroes are permitted.
   *
   * Valid examples:
   * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
   *
   * Not valid examples:
   * 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
   *
   * Required string length: 1 - 23
   *
   * @example amount: "15"
   */
  amount?: string;
  /**
   * @description A list of metadata that you can attach to the payment for providing additional context about the payment.
   *
   * For example, adding orderId to indicate for which order this payment was for or customerId to know which customer this payment pertains to.
   *
   * Metadata will not be visible to the customer that is party to this payment.
   * It will be visible in the pawaPay Dashboard on the payment details page and in your financial statements as a JSON object to support automated reconciliation.\
   * It is also possible to search for recent payments in the pawaPay Dashboard using global search based on the values of metadata.
   *
   * Up to 10 metadata fields can be attached to a payment.
   *
   *
   * @param {string} metadata.fieldName - The name of the metadata that you are attaching to the payment.
   * @example {fieldName: "orderId"}
   *
   *
   * @param {string} metadata.metadata.fieldValue - The value for this metadata field
   * @example {fieldValue: "ORD-123456789"}
   *
   *
   * @param {boolean} metadata.isPII - Indicates whether the field contains personally identifiable information. Used for enabling compliance with GDPR or other relevant data privacy laws.
   * @example {isPII: true}
   */
  metadata?: Array<{
    fieldName: string;
    fieldValue: string;
    isPII?: boolean;
  }>;
};
type RequestPayPageResponse = {
  /**
   * @description The unique URL of the payment page for this specific payment session.
   *
   * Customer has to be forwarded to this URL where they can complete the payment.
   * The session is valid for 15 minutes for the customer to complete the payment.
   *
   * Please note! The URL is valid for 5 minutes.
   *
   * @example
   * redirectUrl: "https://paywith.pawapay.io/?token=AgV4aA3ZxKfGcdMIo6a6Upf7X2MRptdFUrc6Oi3U53CxC0YAkAADABVhd3MtY3J5cHRv"
   */
  redirectUrl: string;
};
type PawaPayError = {
  /**
   * @description A unique error ID in the pawaPay platform.
   *
   * Maximum length: 36
   *
   * @example errorId: "63743264-7292-11ea-bc55-0242ac130003"
   *
   */
  errorId?: string;
  /**
   * @description pawaPay internal error code.
   * @example errorCode: 1
   */
  errorCode?: number;
  /**
   * @description Error message.
   *
   * @example errorMessage: "Internal error"
   */
  errorMessage?: string;
};
type AcceptedDeposit = {
  /**
   * @description The depositId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  depositId: string;
  /**
   * @description The deposit request has been accepted by pawaPay for processing.
   */
  status: "ACCEPTED";
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
};
type DuplicatedIgnoredDeposit = {
  /**
   * @description The depositId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  depositId: string;
  /**
   * @description The deposit request has been ignored as a duplicate of an already accepted deposit request. Duplication logic relies upon depositId.
   */
  status: "DUPLICATE_IGNORED";
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
};
type RejectedDeposit = {
  /**
   * @description The depositId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  depositId: string;
  /**
   * @description The deposit request has been rejected. See rejectionReason for details.
   */
  status: "REJECTED";
  rejectionReason: {
    /**
     * @description Possible deposit rejection codes:
     *
     * - INVALID_PAYER_FORMAT - The payer address (phone number) is invalid.
     * - INVALID_CORRESPONDENT - The specified correspondent is not supported.
     * - INVALID_AMOUNT - The specified amount is not supported.
     * - AMOUNT_TOO_SMALL - The specified amount is smaller than the minimum allowed by the MMO specified as the correspondent.
     * - AMOUNT_TOO_LARGE - The specified amount is larger than the maximum allowed by the MMO specified as the correspondent.
     * - INVALID_CURRENCY - The specified currency is not supported for the MMO specified as the correspondent.
     * - INVALID_COUNTRY - The specified country is not supported for this MMO specified as the correspondent.
     * - PARAMETER_INVALID - One or more parameters are invalid.
     * - INVALID_INPUT - We were unable to parse the payload of the request.
     * - DEPOSITS_NOT_ALLOWED - Deposits are not allowed for the merchant or the MMO specified as the correspondent.
     * - CORRESPONDENT_TEMPORARILY_UNAVAILABLE - The MMO specified as the correspondent is currently experiencing an outage and processing of payments has been temporarily halted.
     *
     * Please refer to our {@link https://status.pawapay.io/ | Status Page} for live information about MMO availability.
     *
     * @example  rejectionCode: "INVALID_AMOUNT"
     *
     */
    rejectionCode: "INVALID_PAYER_FORMAT" | "INVALID_CORRESPONDENT" | "INVALID_AMOUNT" | "AMOUNT_TOO_SMALL" | "AMOUNT_TOO_LARGE" | "INVALID_CURRENCY" | "INVALID_COUNTRY" | "PARAMETER_INVALID" | "INVALID_INPUT" | "DEPOSITS_NOT_ALLOWED" | "CORRESPONDENT_TEMPORARILY_UNAVAILABLE";
    /**
     * Additional optional rejection message
     * @example rejectionMessage: "You don't have access to this correspondent"
     */
    rejectionMessage: string;
  };
};
type DepositResponse = AcceptedDeposit | DuplicatedIgnoredDeposit | RejectedDeposit;
type CheckStatusBaseResponse = {
  /**
   * A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *
   * Required string length: 36
   *
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  depositId: string;
  /**
   * The amount to be collected (deposit) or disbursed (payout or refund).
   *
   * Amount must follow below requirements or the request will be rejected:
   * Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
   * The minimum and maximum amount depends on the limits of the specific MMO. You can find them from the Active Configuration endpoint.\
   * Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
   * Trailing zeroes are permitted.
   *
   * Valid examples:
   * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
   *
   * Not valid examples:
   * 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
   *
   * Required string length: 1 - 23
   *
   * @example requestedAmount: "15"
   */
  requestedAmout: string;
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
   * @description The country in which the MMO operates.
   *
   * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
   *
   * @example Example: "MWI"
   */
  country: string;
  /**
   * @description The correspondent code refers to the specific MMO that the specified phone number (MSISDN) has an active mobile money wallet with.
   *
   * You can find all the supported correspondents {@link https://docs.pawapay.io/using_the_api#correspondents | listed here}.
   *
   * The {@link https://docs.pawapay.io/v1/api-reference/toolkit/active-configuration | active configuration} endpoint provides the list of correspondents configured for your account.
   *
   * You can use the {@link https://docs.pawapay.io/v1/api-reference/toolkit/predict-correspondent | predict correspondent} enpoint to predict the correct correspondent to use based on the phone number (MSISDN).
   *
   * @example
   * Example: "AIRTEL_MWI"
   */
  correspondent: string;
  /**
   * @description The phone number (MSISDN) of the recipient or payer must be specified as the `value` of the `address`.
   */
  payer: {
    /** @description The type of financial address. At the moment, only MSISDN is supported as the financial address.
     * @example
     * {
     *  type: "MSISDN"
     * }
     */
    type: "MSISDN" & string;
    /**
     * @description The phone number (MSISDN) of the payer or recipient.
     *
     * The format is described in {@link https://en.wikipedia.org/wiki/MSISDN | Wikipedia}.
     *
     * MSISDN validation has following rules:
     *
     * - Only digits without whitespaces or any other separators or prefixes like '+'
     * - Should not start with zero.
     * - Country code is mandatory.
     * - Should not exceed or be less than the valid length of specified country.
     * - Valid examples for Malawi: 265999123456
     *
     * Not valid examples for Malawi:
     * +265999123456, +2650999123456, 265 999 123 456, 265-9991-23456, 0265999123456,
     *
     * @example {value: "260763456789"}
     *
     */
    address: {
      value: string;
    };
  };
  /**
   * @description The timestamp of when the deposit was created in the pawaPay platform.
   *
   * Format defined by 'date-time' in RFC3339 section 5.6 from {@link https://tools.ietf.org/html/rfc3339#section-5.6 | IETF}
   *
   * @example Example:"2020-02-21T17:32:28Z"
   */
  customerTimestamp: string;
  /**
   * @description Short description for the transaction.
   *
   * Depending on the specific MMO performing the transaction this message may be visible to the customer in the SMS receipt or within their transaction history.
   *
   * Must be between 4 and 22 alphanumeric characters.
   *
   * Required string length: 4 - 22
   *
   * @example Example: "Note of 4 to 22 chars"
   */
  statementDescription: string;
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
  /**
   * @description The metadata that was provided in the original initation request in a JSON object format.
   */
  metadata: Record<string, unknown>;
};
type CompletedStatus = CheckStatusBaseResponse & {
  /**
   * @description The payout request has been successfully processed. This is a Final state.
   */
  status: "COMPLETED";
  /**
   * @description The amount to be collected (deposit) or disbursed (payout or refund).
   *
   * Amount must follow below requirements or the request will be rejected:
   *
   * Between zero and two decimal places can be supplied, depending on what the specific MMO supports. Learn about all MMO supported decimal places.
   * The minimum and maximum amount depends on the limits of the specific MMO. You can find them from the Active Configuration endpoint.
   * Leading zeroes are not permitted except where the value is less than 1. For any value less than one, one and only one leading zero must be supplied.
   * Trailing zeroes are permitted.
   *
   * Valid examples:
   * 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
   *
   * Not valid examples:
   *
   * 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
   *
   * Required string length: 1 - 23
   *
   * @example depositedAmount: "15"
   */
  depositedAmount: string;
  /**
   * When the MMO responded to this deposit request. Format defined by 'date-time' in RFC3339 section 5.6 from IETF
   *
   * @example
   * respondedByPayer: "2020-02-21T17:32:30Z"
   */
  respondedByPayer: string;
  /**
  * @description The unique ID for this financial transaction assigned by the MMO.
  * @example
  * {
  "MTN_INIT": "ABC123",
  "MTN_FINAL": "DEF456"
  }
  */
  correspondentIds: {
    [key: string]: string;
  };
};
type AcceptedStatus = CheckStatusBaseResponse & {
  /**
   * @description The payout request has been accepted by pawaPay for processing.
   */
  status: "ACCEPTED";
};
type EnqueuedStatus = CheckStatusBaseResponse & {
  /**
   * @description The payout request has been accepted, but has been enqueued for processing later. Read more about {@link https://docs.pawapay.io/payouts#enqueued-payouts | enqueued payouts}.
   */
  status: "ENQUEUED";
};
type SubmittedStatus = CheckStatusBaseResponse & {
  /**
   * @description The payout request has been submitted to the MMO and is being processed.
   */
  status: "SUBMITTED";
};
type FailedStatus = CheckStatusBaseResponse & {
  /**
   * @description The payout request has been processed, but failed. Final state.
   */
  status: "FAILED";
  failureReason: {
    /**
     * @description Possible deposit failure codes:
     *
     * - PAYER_NOT_FOUND - The phone number specified as the Payer does not belong to the MMO specified as the correspondent.
     * - PAYMENT_NOT_APPROVED - Payer did not approve the payment.
     * - PAYER_LIMIT_REACHED - Payer has reached a transaction limit of their mobile money wallet.
     * - INSUFFICIENT_BALANCE - Payer does not have enough funds.
     * - TRANSACTION_ALREADY_IN_PROCESS - Payer already has an unfinalized transaction being processed by the MMO.
     * - OTHER_ERROR - Any other error. Please refer to failureMessage.
     *
     * @example failureCode: "OTHER_ERROR"
     */
    failureCode: "PAYER_NOT_FOUND" | "PAYMENT_NOT_APPROVED" | "PAYER_LIMIT_REACHED" | "INSUFFICIENT_BALANCE" | "TRANSACTION_ALREADY_IN_PROCESS" | "OTHER_ERROR";
    /**
     * @description Additional optional failure message
     * @example failureMessage: "Recipient's address is blocked"
     */
    failureMessage: string;
  };
};
type DepositStatus = CompletedStatus | AcceptedStatus | EnqueuedStatus | SubmittedStatus | FailedStatus;
type ResendDepositBase = {
  /**
   * @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
   *
   * Required string length: 36
   *
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  despositId: string;
};
type ResendDepositAccepted = ResendDepositBase & {
  /**
   *@description The manual action request has been accepted by pawaPay for processing. */
  status: "ACCEPTED";
};
type ResendDepositRejected = ResendDepositBase & {
  /**
   *@description The manual action request has been rejected by pawaPay. See rejectionReason for details. */
  status: "REJECTED";
  /**
   * @description Human-readable explanation why request has been rejected
   * @example rejectionReason:"Deposit with ID \\#f4401bd2-1568-4140-bf2d-eb77d2b2b639 not found"
   */
  rejectionReason: string;
};
type ResendDepositFailed = ResendDepositBase & {
  /**
   *@description The manual action request has failed during submitting for processing due to internal reasons. */
  status: "FAILED";
};
type ResendDepositResponse = ResendDepositAccepted | ResendDepositRejected | ResendDepositFailed;
type AcceptedRefund = {
  /**
   * @description The refundId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  refundId: string;
  /**
   * @description The refund request has been accepted by pawaPay for processing.
   */
  status: "ACCEPTED";
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
};
type DuplicatedIgnoredRefund = {
  /**
   * @description The refundId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  depositId: string;
  /**
   * @description The refund request has been ignored as a duplicate of an already accepted refund request. Duplication logic relies upon refundId.
   */
  status: "DUPLICATE_IGNORED";
  /**
   * ISO Date String
   * @example "2020-10-19T11:17:01Z"
   */
  created: string;
};
type RejectedRefund = {
  /**
   * @description The refundId of the deposit transaction.
   *
   * Required string length: 36
   * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  refundId: string;
  /**
   * @description The refund request has been rejected by pawaPay. See rejectionReason for details.
   */
  status: "REJECTED";
  rejectionReason: {
    /**
     * @description Possible deposit rejection codes:
     *
     * - DEPOSIT_NOT_FOUND- Requested deposit for refund has not been found.
     * - DEPOSIT_NOT_COMPLETED- Requested deposit was not completed.
     * - ALREADY_REFUNDED- Requested deposit has been already refunded.
     * - IN_PROGRESS- Another refund transaction is already in progress.
     * - INVALID_AMOUNT- The specified amount is not supported.
     * - AMOUNT_TOO_SMALL - The specified amount is smaller than the minimum allowed by the MMO specified as the correspondent.
     * - AMOUNT_TOO_LARGE - The specified amount is larger than the maximum allowed by the MMO specified as the correspondent.
     * - INVALID_CURRENCY - The specified currency is not supported by the MMO specified as the correspondent.
     * - INVALID_COUNTRY - The specified country is not supported for the MMO specified as the correspondent.
     * - PARAMETER_INVALID - One or more parameters are invalid.
     * - INVALID_INPUT - We were unable to parse the payload of the request.
     * - REFUNDS_NOT_ALLOWED - Refunds are not allowed for this merchant or the MMO specified as the correspondent.
     * - CORRESPONDENT_TEMPORARILY_UNAVAILABLE - The MMO specified as the correspondent is currently experiencing an outage and processing of payments has been temporarily halted.
     *
     * Please refer to our {@link https://status.pawapay.io/ | Status Page} for live information about MMO availability.
     *
     * @example  rejectionCode: "INVALID_AMOUNT"
     *
     */
    rejectionCode: "DEPOSIT_NOT_FOUND" | "DEPOSIT_NOT_COMPLETED" | "ALREADY_REFUNDED" | "IN_PROGRESS" | "INVALID_AMOUNT" | "AMOUNT_TOO_SMALL" | "AMOUNT_TOO_LARGE" | "PARAMETER_INVALID" | "INVALID_INPUT" | "REFUNDS_NOT_ALLOWED" | "CORRESPONDENT_TEMPORARILY_UNAVAILABLE";
    /**
     * Additional optional rejection message
     * @example rejectionMessage: "You don't have access to this correspondent"
     */
    rejectionMessage: string;
  };
};
type RequestRefundResponse = AcceptedRefund | RejectedRefund | DuplicatedIgnoredRefund;
type ResendRefundBase = {
  /**
   * @description The refundId of the refund transaction.
   *
   * Required string length: 36
   *
   * @example refundId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
   */
  refundId: string;
};
type ResendRefundAccepted = ResendRefundBase & {
  /**
   *@description The manual action request has been accepted by pawaPay for processing. */
  status: "ACCEPTED";
};
type ResendRefundRejected = ResendRefundBase & {
  /**
   *@description The manual action request has been rejected by pawaPay. See rejectionReason for details. */
  status: "REJECTED";
  /**
   * @description Human-readable explanation why request has been rejected
   * @example rejectionReason:"Refund with ID \\#f4401bd2-1568-4140-bf2d-eb77d2b2b639 not found"
   */
  rejectionReason: string;
};
type ResendRefundFailed = ResendRefundBase & {
  /**
   *@description The manual action request has failed during submitting for processing due to internal reasons. */
  status: "FAILED";
};
type ResendRefundCallbackResponse = ResendRefundAccepted | ResendRefundRejected | ResendRefundFailed;
type CheckRefundStatusBase = {
  refundId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  recipient: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  created: string;
  metadata: Record<string, unknown>;
};
type CheckRefundStatusCompleted = CheckRefundStatusBase & {
  status: "COMPLETED";
  receivedByRecipient: string;
  correspondentIds: Record<string, unknown>;
};
type CheckRefundStatusAccepted = CheckRefundStatusBase & {
  status: "ACCEPTED";
};
type CheckRefundStatusSubmitted = CheckRefundStatusBase & {
  status: "SUBMITTED";
};
type CheckRefundStatusFailed = CheckRefundStatusBase & {
  status: "FAILED";
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
};
type CheckRefundStatusResponse = CheckRefundStatusCompleted | CheckRefundStatusAccepted | CheckRefundStatusSubmitted | CheckRefundStatusFailed;
type RefundCallback = {
  refundId: string;
  status: string;
  amount: string;
  currency: string;
  country: string;
  correspondent: string;
  recipient: {
    type: string;
    address: {
      value: string;
    };
  };
  customerTimestamp: string;
  statementDescription: string;
  created: string;
  receivedByRecipient: string;
  correspondentIds: Record<string, unknown>;
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
  metadata: Record<string, unknown>;
};
type WalletBalance = {
  balances: {
    /**
     * @description The country in which the MMO operates.
     *
     * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
     *
     * @example Example: "MWI"
     */
    country: string;
    /**
     * @description The current balance of the wallet.
     *
     * @example balance: "1000.0"
     */
    balance: string;
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
     * @example If you are using a wallet that is only used by a single MMO, that MMO-s correspondent code will be shown here.
     *
     * @example mno: "AIRTEL_MWI"
     */
    mno: string;
  }[];
};
type OperationalType = {
  operationType: string;
  minTransactionLimit: string;
  maxTransactionLimit: string;
};
type Correspondent = {
  correspondent: string;
  currency: string;
  ownerName: string;
  operationTypes: Array<OperationalType>;
};
interface Countries<T> {
  country: string;
  correspondents: Array<T>;
}
type ActiveConfigurationResponse = {
  merchantId: string;
  merchantName: string;
  countries: Array<Countries<Correspondent>>;
};
type CorrespondentOperationalType = {
  operationType: "DEPOSIT" | "PAYOUT";
  status: "OPERATIONAL" | "DELAYED" | "CLOSED";
};
type CorrespondentData = {
  correspondent: string;
  operationalType: Array<CorrespondentOperationalType>;
};
interface AvailableCorrespondentResponse extends Countries<CorrespondentData> {}
interface PredictCorrespondentResponse {
  country: string;
  operator: string;
  correspondent: string;
  msisdn: string;
}
type PublicKeysResponse = {
  /**
   * @description The ID of the public key. */
  id: string;
  /**
   * @description The public key to use when verifying the signature in a callback sent by pawaPay. */
  key: string;
};
//#endregion
//#region src/types/v2/active-conf.t.d.ts
type OperationTypeCode = "DEPOSIT" | "PAYOUT" | "REFUND" | "REMITTANCE" | "USSD_DEPOSIT" | "NAME_LOOKUP";
type OperationStatus = "OPERATIONAL" | "DELAYED" | "CLOSED";
type DecimalsInAmount = "NONE" | "FIXED" | "VARIABLE";
type AuthType = "PROVIDER_AUTH";
type PinPromptType = "AUTOMATIC" | "MANUAL";
type ChannelType = "USSD";
interface ActiveConfiguration {
  companyName: string;
  signatureConfiguration: SignatureConfiguration;
  countries: Country[];
}
interface SignatureConfiguration {
  signedRequestsOnly: boolean;
  signedCallbacks: boolean;
}
interface DisplayName {
  en: string;
  fr: string;
}
interface Country {
  country: string;
  displayName: DisplayName;
  prefix: string;
  flag: string;
  providers: Provider[];
}
interface Provider {
  provider: string;
  displayName: string;
  logo: string;
  nameDisplayedToCustomer: string;
  currencies: Currency[];
}
interface Currency {
  currency: string;
  displayName: string;
  operationTypes: OperationType[];
}
interface OperationType {
  operationType: OperationTypeCode;
  config?: DepositConfig$1;
  minTransactionLimit?: string;
  maxTransactionLimit?: string;
  decimalsInAmount?: DecimalsInAmount;
  status?: OperationStatus;
  callbackUrl?: string;
}
interface PinPromptInstructions {
  channels: Channel[];
}
interface Channel {
  type: ChannelType;
  displayName: DisplayName;
  quickLink: string;
  variables: Variables;
  instructions: Instructions;
}
interface Variables {
  shortCode: string;
}
interface Instructions {
  en: Instruction[];
  fr: Instruction[];
}
interface Instruction {
  text: string;
  template: string;
}
interface DepositConfig$1 {
  authType: AuthType;
  pinPrompt: PinPromptType;
  pinPromptRevivable: boolean;
  pinPromptInstructions: PinPromptInstructions;
}
//#endregion
//#region src/types/v2/payouts.t.d.ts
type ResendPayoutCallbackResponse_v2 = {
  remittanceId: string;
  status: "ACCEPTED";
} | {
  remittanceId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND" | "INVALID_STATE";
    failureMessage: string;
  };
};
type CancelEnqueuedPayoutResponse_v2 = {
  remittanceId: string;
  status: "ACCEPTED";
} | {
  remittanceId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND" | "INVALID_STATE";
    failureMessage: string;
  };
};
type RequestPayoutConfig_v2 = {
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
type RequestPayoutResponse_v2 = {
  payoutId: string;
  status: "ACCEPTED" | "DUPLICATE_IGNORED";
  created: string;
} | {
  payoutId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "PROVIDER_TEMPORARILY_UNAVAILABLE" | "INVALID_PHONE_NUMBER" | "INVALID_CURRENCY" | "INVALID_AMOUNT" | "AMOUNT_OUT_OF_BOUNDS";
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
} & ({
  status: "COMPLETED";
  providerTransactionId: string;
} | {
  status: "FAILED";
  failureReason: {
    failureCode: "RECIPIENT_NOT_FOUND";
    failureMessage: string;
  };
} | {
  status: "ACCEPTED" | "PROCESSING" | "IN_RECONCILIATION";
});
type CheckPayoutStatus_v2 = {
  status: "FOUND";
  data: CheckPayoutData_v2;
} | {
  status: "NOT_FOUND";
};
type BulkPayoutResponse_v2 = ({
  payoutId: string;
  status: "ACCEPTED" | "DUPLICATE_IGNORED";
  created: string;
} | {
  payoutId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
})[];
//#endregion
//#region src/types/v2/paypage.t.d.ts
type RequestPayPageConfig_v2 = {
  depositId: string;
  returnUrl: string;
  customerMessage: string;
  amountDetails: {
    amount: string;
    currency: string;
  };
  phoneNumber: string;
  language: string;
  country: string;
  reason: string;
  metadata: Array<Record<string, unknown>>;
};
//#endregion
//#region src/types/v2/refunds.t.d.ts
type RequestRefundConfig_v2 = {
  refundId: string;
  depositId: string;
  amount: string;
  currency: string;
  clientReferenceId: string;
  metadata: Array<Record<string, unknown>>;
};
type RequestRefundResponse_v2 = {
  refundId: string;
  status: "ACCEPTED";
  created: string;
} | {
  refundId: string;
  status: "DUPLICATE_IGNORED";
  created: string;
} | {
  refundId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "PROVIDER_TEMPORARILY_UNAVAILABLE" | "INVALID_PHONE_NUMBER" | "INVALID_CURRENCY" | "INVALID_AMOUNT" | "AMOUNT_OUT_OF_BOUNDS";
    failureMessage: string;
  };
};
type RefundStatusResponse_v2 = {
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
} | {
  status: "NOT_FOUND";
};
type ResendRefundCallbackResponse_v2 = {
  remittanceId: string;
  status: "ACCEPTED";
} | {
  remittanceId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND" | "INVALID_STATE";
    failureMessage: string;
  };
};
//#endregion
//#region src/types/v2/remittence.t.d.ts
type InitiateRemittanceConfig = {
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
type InitiateRemittanceResponse = {
  remittanceId: string;
  status: "ACCEPTED" | "DUPLICATE_IGNORED";
  created: string;
} | {
  remittanceId: string | null;
  status: "REJECTED";
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
};
type RemittanceCallback = {
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
type CancelEnqueuedRemittanceResponse = {
  remittanceId: string;
  status: "ACCEPTED";
} | {
  remittanceId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND" | "INVALID_STATE";
    failureMessage: string;
  };
};
type CheckRemittanceStatusResponse = {
  status: "FOUND";
  data: {
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
  } | {
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
  } | {
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
} | {
  status: "NOT_FOUND";
};
type ResendRemittanceCallbackResponse = {
  remittanceId: string;
  status: "ACCEPTED";
} | {
  remittanceId: string;
  status: "REJECTED";
  failureReason: {
    failureCode: "NOT_FOUND" | "INVALID_STATE";
    failureMessage: string;
  };
};
//#endregion
//#region src/types/v2/statements.t.d.ts
type RequestStatementConfig = {
  wallet: {
    country: string;
    currency: string;
    provider: string;
  };
  callbackUrl: string;
  startDate: string;
  endDate: string;
  compressed: boolean;
};
type RequestStatementResponse_v2 = {
  status: "ACCEPTED";
  statementId: string;
  created: string;
} | {
  status: "REJECTED";
  failureReason: {
    failureCode: "INVALID_CALLBACK_URL" | "INVALID_DATE_RANGE" | "WALLET_NOT_FOUND";
    failureMessage: string;
  };
};
type StatementWallet = {
  currency: string;
  country: string;
  provider: string;
};
type StatementData = {
  statementId: string;
  status: "COMPLETED";
  wallet: StatementWallet;
  created: string;
  startDate: string;
  endDate: string;
  fileSIze: number;
  downloadUrl: string;
  downloadUrlExpiresAt: string;
  completedAt: string;
} | {
  statementId: string;
  status: "PROCESSING";
  wallet: StatementWallet;
  created: string;
  startDate: string;
  endDate: string;
} | {
  statementId: string;
  status: "FAILED";
  wallet: StatementWallet;
  created: string;
  startDate: string;
  endDate: string;
  failedAt: string;
};
type CheckStatementStaus_v2 = {
  status: "FOUND";
  data: StatementData;
} | {
  status: "NOT_FOUND";
};
type StatementCallback_v2 = {
  statementId: string;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  wallet: {
    country: string;
    currency: string;
    provider: string;
  };
  created: string;
  startDate: string;
  endDate: string;
  fileSize: number;
  downloadUrl: string;
  downloadUrlExpiresAt: string;
  completedAt: string;
  failedAt: string;
  failureReason: {
    failureCode: string;
    failureMessage: string;
  };
};
//#endregion
//#region src/types/v2/toolkit.t.d.ts
type ProviderAvailability_v2 = Array<{
  country: string;
  providers: Array<{
    provider: string;
    operationTypes: Array<{
      operationType: "DEPOSIT" | "PAYOUT" | "REMITTANCE" | "REFUND" | "USSD_DEPOSIT" | "NAME_LOOKUP";
      status: "OPERATIONAL" | "DELAYED" | "CLOSED";
    }>;
  }>;
}>;
type ProviderPrediction_v2 = {
  country: string;
  provider: string;
  phoneNumber: string;
};
type WalletBalance_v2 = {
  balances: Array<{
    country: string;
    balance: string;
    currency: string;
    provider: string;
  }>;
};
//#endregion
//#region src/types/methods.t.d.ts
type V1Methods = {
  requestDeposit(data: DepositConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<DepositResponse, PawaPayError>>;
  checkDepositStatus(depositId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<DepositStatus[], PawaPayError>>;
  resendDepositCallback(depositId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>>;
  requestPayout(data: RequestPayoutConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestPayoutRespose, PawaPayError>>;
  checkPayoutStatus(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CheckPayoutStatusResponse[], PawaPayError>>;
  resendPayoutCallback(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendPayoutCallbackResponse, PawaPayError>>;
  cancelEnqueuedPayout(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse, PawaPayError>>;
  initiateBulkPayout(data: RequestBulkPayoutConfig[], args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestBuildPayoutResponse[], PawaPayError>>;
  initiateRefund(refundConfig: RequestRefundConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestRefundResponse, PawaPayError>>;
  checkRefundStatus(refundId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CheckRefundStatusResponse[], PawaPayError>>;
  resendRefundCallback(refundId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendRefundCallbackResponse, PawaPayError>>;
  requestPayPage(payload: RequestPayPageConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>>;
  getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance, PawaPayError>>;
  getWalletBalancesByCountry(country: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance, PawaPayError>>;
  getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfigurationResponse, PawaPayError>>;
  getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<AvailableCorrespondentResponse[], PawaPayError>>;
  getProviderPrediction(msisdn: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PredictCorrespondentResponse, PawaPayError>>;
  getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse[], PawaPayError>>;
};
type V2Methods = {
  requestDeposit(data: DepositConfig_v2, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<DepositResponse_v2, PawaPayError>>;
  checkDepositStatus(depositId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<DepositStatusResponse_v2, PawaPayError>>;
  resendDepositCallback(depositId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendDepositCallbackResponse_v2, PawaPayError>>;
  checkPayoutStatus(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CheckPayoutStatus_v2, PawaPayError>>;
  requestPayout(data: RequestPayoutConfig_v2, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestPayoutResponse_v2, PawaPayError>>;
  cancelEnqueuedPayout(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse_v2, PawaPayError>>;
  resendPayoutCallback(payoutId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendPayoutCallbackResponse_v2, PawaPayError>>;
  initiateBulkPayout(data: Array<RequestPayoutConfig_v2>, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<BulkPayoutResponse_v2, PawaPayError>>;
  initiateRefund(data: RequestRefundConfig_v2, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestRefundResponse_v2, PawaPayError>>;
  checkRefundStatus(refundId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RefundStatusResponse_v2, PawaPayError>>;
  resendRefundCallback(refundId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendRefundCallbackResponse_v2, PawaPayError>>;
  initiateRemittance(data: InitiateRemittanceConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<InitiateRemittanceResponse, PawaPayError>>;
  resendRemittanceCallback(remittanceId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ResendRemittanceCallbackResponse, PawaPayError>>;
  checkRemittanceStatus(remittanceId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CheckRemittanceStatusResponse, PawaPayError>>;
  cancelEnqueuedRemittance(remittanceId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CancelEnqueuedRemittanceResponse, PawaPayError>>;
  requestPayPage(data: RequestPayPageConfig_v2, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>>;
  getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance_v2, PawaPayError>>;
  requestStatement(data: RequestStatementConfig, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<RequestStatementResponse_v2, PawaPayError>>;
  getStatementStatus(statementId: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<CheckStatementStaus_v2, PawaPayError>>;
  getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfiguration, PawaPayError>>;
  getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ProviderAvailability_v2, PawaPayError>>;
  getProviderPrediction(phoneNumber: string, args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ProviderPrediction_v2, PawaPayError>>;
  getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse, PawaPayError>>;
};
//#endregion
//#region src/client.d.ts
type ApiVersion = "v1" | "v2";
type ClientConfig<T extends ApiVersion> = {
  apiVersion?: T;
  environment?: "live" | "sandbox";
};
//#endregion
//#region src/types/factory.d.ts
type PawaPayClientV1 = V1Methods;
type PawaPayClientV2 = V2Methods;
declare function createPawaPayClient(apiKey: string, config?: ClientConfig<"v1"> & {
  apiVersion?: "v1";
}): PawaPayClientV1;
declare function createPawaPayClient(apiKey: string, config?: ClientConfig<"v2"> & {
  apiVersion?: "v2";
}): PawaPayClientV2;
//#endregion
export { ActiveConfiguration, type ActiveConfigurationResponse, AuthType, type AvailableCorrespondentResponse, BulkPayoutResponse_v2, type CancelEnqueuedPayoutResponse, CancelEnqueuedPayoutResponse_v2, CancelEnqueuedRemittanceResponse, Channel, ChannelType, type CheckPayoutStatusResponse, CheckPayoutStatus_v2, type CheckRefundStatusResponse, CheckRemittanceStatusResponse, CheckStatementStaus_v2, Country, Currency, DecimalsInAmount, DepositCallBack_v2, type DepositCallback, type DepositConfig, DepositConfig_v2, type DepositResponse, DepositResponse_v2, type DepositStatus, DepositStatusResponse_v2, DisplayName, InitiateRemittanceConfig, InitiateRemittanceResponse, Instruction, Instructions, OperationStatus, OperationType, OperationTypeCode, type PawaPayError, type PawaPayResponse, type PayoutCallback, PinPromptInstructions, PinPromptType, type PredictCorrespondentResponse, Provider, ProviderAvailability_v2, ProviderPrediction_v2, type PublicKeysResponse, type RefundCallback, RefundStatusResponse_v2, RemittanceCallback, type RequestBuildPayoutResponse, type RequestBulkPayoutConfig, type RequestOptions, type RequestPayPageConfig, RequestPayPageConfig_v2, type RequestPayPageResponse, type RequestPayoutConfig, RequestPayoutConfig_v2, RequestPayoutResponse_v2, type RequestPayoutRespose, type RequestRefundConfig, RequestRefundConfig_v2, type RequestRefundResponse, RequestRefundResponse_v2, RequestStatementConfig, RequestStatementResponse_v2, ResendDepositCallbackResponse_v2, type ResendDepositResponse, type ResendPayoutCallbackResponse, ResendPayoutCallbackResponse_v2, type ResendRefundCallbackResponse, ResendRefundCallbackResponse_v2, ResendRemittanceCallbackResponse, SignatureConfiguration, StatementCallback_v2, Variables, type WalletBalance, WalletBalance_v2, createPawaPayClient };
//# sourceMappingURL=index.d.cts.map