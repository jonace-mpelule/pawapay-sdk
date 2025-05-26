export interface PawaPayResponse<T = any, E = any> {
    success: boolean;
    data?: T;
    status?: number;
    error?: E;
    headers?: any;
}

export interface RequestOptions {
    timeout?: number;
    headers?: Record<string, string>
}


// Request Deposit Types

export type DepositConfig = {
    /**
     *  @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
     *  Required string length: 36
     *  @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
     */
    depositId: string,

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
    amount: string,


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
    currency: string,


    /**
     * @description The country in which the MMO operates.
     *
     * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
     *
     * @example Example: "MWI"
     */
    country?: string,

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
    correspondent: string,

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
        type: "MSISDN" & string,
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
            value: string
        }
    },

    /**
     * @description The timestamp of when the deposit was created in the pawaPay platform.
     *
     * Format defined by 'date-time' in RFC3339 section 5.6 from {@link https://tools.ietf.org/html/rfc3339#section-5.6 | IETF}
     *
     * @example Example:"2020-02-21T17:32:28Z"
     */
    customerTimestamp: string,

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
    statementDescription: string,

    /**
     * @description For MMOs (correspondents) that use a preauthorisation code instead of a PIN prompt for authorising the deposit.
     *
     * Required string length: 1 - 36
     */
    preAuthorisationCode?: string,

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
    metadata?: Array<{ fieldName: string, fieldValue: string, isPII?: boolean }>
}

export type RequestPayoutConfig = {
    /**
     * @description A UUIDv4 based ID specified by you, that uniquely identifies the payout.
     * Required string length: 36
     * @example payoutId: "<INSERT_UUID_FOR_PAYOUT>"
     */
    payoutId: string,
    /**
     * @description The amount to be disbursed for the payout.
     *
     * Amount must follow the same requirements as in DepositConfig.
     * Valid examples: 5, 5.0, 5.00, 5.5, 5.55, 5555555, 0.5
     * Not valid examples: 5., 5.555, 5555555555555555555, .5, -5.5, 00.5, 00.00, 00001.32
     * Required string length: 1 - 23
     * @example "15"
     */
    amount: string,
    /**
     * @description The currency in which the amount is specified.
     * Format must be the ISO 4217 three character currency code in upper case.
     * @example "MWK"
     */
    currency: string,
    /**
     * @description The correspondent code refers to the specific MMO that the recipient has an active mobile money wallet with.
     * @example "AIRTEL_MWI"
     */
    correspondent: string,
    /**
     * @description The phone number (MSISDN) of the recipient.
     * Format: Only digits, no whitespaces or separators, no leading zero, must include country code.
     * @example "265999123456"
     */
    recipient: string,
    /**
     * @description The timestamp of when the payout was created in the pawaPay platform.
     * Format defined by 'date-time' in RFC3339 section 5.6.
     * @example "2020-02-21T17:32:28Z"
     */
    customerTimestamp: string,
    /**
     * @description Short description for the transaction, visible to the customer in SMS or transaction history.
     * Must be between 4 and 22 alphanumeric characters.
     * @example "Note of 4 to 22 chars"
     */
    statementDescription: string,
    /**
     * @description The country in which the MMO operates. ISO 3166-1 alpha-3 code in upper case.
     * @example "MWI"
     */
    country: string,
    /**
     * @description A list of metadata for providing additional context about the payout. Up to 10 fields allowed.
     * @example [{ fieldName: "orderId", fieldValue: "ORD-123456789", isPII: false }]
     */
    metadata: Array<{ fieldName: string, fieldValue: string, isPII?: boolean }>
}

type BaseRequestPayoutResponse = {
    payoutId: string
    status: string
}

type AcceptedRequestPayout = BaseRequestPayoutResponse & {
    status: "ACCEPTED",
    created: string,
}

type DuplicateIgnoredRequestPayout = BaseRequestPayoutResponse & {
    status: "DUPLICATE_IGNORED"
    created: string,
}

type RejectedRequestPayout = BaseRequestPayoutResponse & {
    status: "REJECTED",
    rejectionReason: {
        rejectionCode: string,
        rejectionMessage: string
    }
}

export type RequestPayoutRespose =
    | AcceptedRequestPayout
    | DuplicateIgnoredRequestPayout
    | RejectedRequestPayout


export type PayoutCallback = {
    payoutId: string,
    status: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: {
        type: string,
        address: {
            value: string
        }
    },
    customerTimestamp: string,
    statementDescription: string,
    created: string,
    receivedByRecipient: string,
    correspondentIds: {},
    failureReason: {
        failureCode: string,
        failureMessage: string
    },
    metadata: {}
}

type CheckPayoutStatusBase = {
    payoutId: string,
    status: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: {
        type: string,
        address: {
            value: string
        }
    },
    customerTimestamp: string,
    statementDescription: string,
    created: string,
    metadata: {}
}

type CheckPayoutStatusAccepted = CheckPayoutStatusBase & {
    status: "ACCEPTED",
    created: string,
}
type CheckPayoutStatusCompleted = CheckPayoutStatusBase & {
    status: "COMPLETED",
    receivedByRecipient: string,
    correspondentIds: {}
}

type CheckPayoutStatusSubmitted = CheckPayoutStatusBase & {
    status: "SUBMITTED",
    created: string,
}

type CheckPayoutStatusEnqueued = CheckPayoutStatusBase & {
    status: "ENQUEUED",
    created: string,
}
type CheckPayoutStatusSFailed = CheckPayoutStatusBase & {
    status: "FAILED",
    failureReason: {
        failureCode: string,
        failureMessage: string
    },
    created: string,
}

export type CheckPayoutStatusResponse =
    | CheckPayoutStatusAccepted
    | CheckPayoutStatusCompleted
    | CheckPayoutStatusSubmitted
    | CheckPayoutStatusEnqueued
    | CheckPayoutStatusSFailed


type CancelEnqueuedPayoutBase = {
    payoutId: string,
    status: string
}

type CancelEnqueuedPayoutAccepted = CancelEnqueuedPayoutBase & {
    status: "ACCEPTED",
    created: string,
}
type CancelEnqueuedPayoutRejected = CancelEnqueuedPayoutBase & {
    status: "REJECTED",
    failureReason: string,
}

type CancelEnqueuedPayoutFailed = CancelEnqueuedPayoutBase & {
    status: "FAILED",
}

export type CancelEnqueuedPayoutResponse =
    | CancelEnqueuedPayoutAccepted
    | CancelEnqueuedPayoutRejected
    | CancelEnqueuedPayoutFailed


export type RequestBulkPayoutConfig = {
    payoutId: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: {
        type: string,
        address: { value: string }
    },
    customerTimestamp: string,
    statementDescription: string,
    metadata: Array<{ fieldName: string, fieldValue: string, isPII: boolean }>
}


type RequestBuildPayoutResponseBase = {
    payoutId: string,
    status: string,
    created: string
}

type RequestBuildPayoutResponseAccepted = RequestBuildPayoutResponseBase & {
    status: "ACCEPTED",
    created: string,
}

type RequestBuildPayoutResponseDuplicateIgnored = RequestBuildPayoutResponseBase & {
    status: "DUPLICATE_IGNORED"
}

type RequestBuildPayoutResponseRejected = RequestBuildPayoutResponseBase & {
    status: "REJECTED",
    failureReason: {
        rejectionCode: string,
        rejectionMessage: string
    }
}

export type RequestBuildPayoutResponse =
    | RequestBuildPayoutResponseAccepted
    | RequestBuildPayoutResponseDuplicateIgnored
    | RequestBuildPayoutResponseRejected


type ResendPayoutCallbackBase = {
    payoutId: string,
    status: string
}
type ResendPayoutCallbackAccepted = ResendPayoutCallbackBase & {
    status: "ACCEPTED",
}

type ResendPayoutCallbackRejected = ResendPayoutCallbackBase & {
    status: "REJECTED",
    failureReason: string
}

type ResendPayoutCallbackFailed = ResendPayoutCallbackBase & {
    status: "FAILED",
}

export type ResendPayoutCallbackResponse =
    | ResendPayoutCallbackAccepted
    | ResendPayoutCallbackRejected
    | ResendPayoutCallbackFailed


// --- PAYPAGE

export type RequestPayPageConfig = {
    /**
     * A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
     *
     * Required string length: 36
     * @example depositId: "<INSERT_UUID_FOR_DEPOSIT>"
     */
    depositId: string,
    /**
     * The URL to which the user will be redirected after completion of the operation.
     *
     * @example returnUrl: "https://merchant.com/paymentProcessed"
     */
    returnUrl: string,
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
    statementDescription?: string,

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
    amount?: string,

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
    msisdn: string,
    /**
     * The language in which the Payment Page will be presented to the customer. If the user has explicitly changed their languages preferences, their selection will override this parameter.
     *
     * Available options: EN, FR
     *
     * @example language: "EN"
     */
    language?: string,

    /**
     * @description The country in which the MMO operates.
     *
     * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
     *
     * @example Example: "MWI"
     */
    country?: string,

    /**
     * Optional text which will be displayed to the customer on the payment page to specify what they are paying for.
     *
     * Required string length: 1 - 50
     *
     * @example reason: "Ticket to festival"
     */
    reason?: string,

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
    metadata?: Array<{ fieldName: string, fieldValue: string, isPII?: boolean }>
}

export type RequestRefundConfig = {
    /**
     *@description A UUIDv4 based ID specified by you, that uniquely identifies the refund.
     *
     * Required string length: 36
     *
     * @example refundId:"<INSERT_UUID_FOR_REFUND>"
     */
    refundId: string,

    /**
     * @description The depositId of the deposit to be refunded.
     *
     * Required string length: 36
     *
     * @example depositId:"<INSERT_UUID_OF_DEPOSIT_TO_REFUND>"
     */

    depositId: string,
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
    amount?: string,
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
    metadata?: Array<{ fieldName: string, fieldValue: string, isPII?: boolean }>
}


export type RequestPayPageResponse = {
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
    redirectUrl: string
}

export type PawaPayError = {
    /**
     * @description A unique error ID in the pawaPay platform.
     *
     * Maximum length: 36
     *
     * @example errorId: "63743264-7292-11ea-bc55-0242ac130003"
     *
     */
    errorId?: string,

    /**
     * @description pawaPay internal error code.
     * @example errorCode: 1
     */
    errorCode?: number,

    /**
     * @description Error message.
     *
     * @example errorMessage: "Internal error"
     */
    errorMessage?: string
}


// * Deposit Response Types

type AcceptedDeposit = {
    /**
     * @description The depositId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    depositId: string,
    /**
     * @description The deposit request has been accepted by pawaPay for processing.
     */
    status: "ACCEPTED",
    /**
     * ISO Date String
     * @example "2020-10-19T11:17:01Z"
     */
    created: string,
}

type DuplicatedIgnoredDeposit = {
    /**
     * @description The depositId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    depositId: string,
    /**
     * @description The deposit request has been ignored as a duplicate of an already accepted deposit request. Duplication logic relies upon depositId.
     */
    status: "DUPLICATE_IGNORED",
    /**
     * ISO Date String
     * @example "2020-10-19T11:17:01Z"
     */
    created: string
}

type RejectedDeposit = {
    /**
     * @description The depositId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    depositId: string,
    /**
     * @description The deposit request has been rejected. See rejectionReason for details.
     */
    status: "REJECTED",
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
        rejectionCode: |
        "INVALID_PAYER_FORMAT"
        | "INVALID_CORRESPONDENT"
        | "INVALID_AMOUNT"
        | "AMOUNT_TOO_SMALL"
        | "AMOUNT_TOO_LARGE"
        | "INVALID_CURRENCY"
        | "INVALID_COUNTRY"
        | "PARAMETER_INVALID"
        | "INVALID_INPUT"
        | "DEPOSITS_NOT_ALLOWED"
        | "CORRESPONDENT_TEMPORARILY_UNAVAILABLE"

        /**
         * Additional optional rejection message
         * @example rejectionMessage: "You don't have access to this correspondent"
         */
        rejectionMessage: string
    }
}

export type DepositResponse =
    | AcceptedDeposit
    | DuplicatedIgnoredDeposit
    | RejectedDeposit


// Deposit CheckStatus Response Types

type CheckStatusBaseResponse = {
    /**
     * A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
     *
     * Required string length: 36
     *
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    depositId: string,
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
    requestedAmout: string,
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
    currency: string,

    /**
     * @description The country in which the MMO operates.
     *
     * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
     *
     * @example Example: "MWI"
     */
    country: string,

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
    correspondent: string,

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
        type: "MSISDN" & string,
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
            value: string
        }
    },

    /**
     * @description The timestamp of when the deposit was created in the pawaPay platform.
     *
     * Format defined by 'date-time' in RFC3339 section 5.6 from {@link https://tools.ietf.org/html/rfc3339#section-5.6 | IETF}
     *
     * @example Example:"2020-02-21T17:32:28Z"
     */
    customerTimestamp: string,

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
    statementDescription: string,

    /**
     * ISO Date String
     * @example "2020-10-19T11:17:01Z"
     */
    created: string,

    /**
     * @description The metadata that was provided in the original initation request in a JSON object format.
     */
    metadata: {}
}

type CompletedStatus = CheckStatusBaseResponse & {
    /**
     * @description The payout request has been successfully processed. This is a Final state.
     */
    status: "COMPLETED",
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
    depositedAmount: string

    /**
     * When the MMO responded to this deposit request. Format defined by 'date-time' in RFC3339 section 5.6 from IETF
     *
     * @example
     * respondedByPayer: "2020-02-21T17:32:30Z"
     */
    respondedByPayer: string,

    /**
     * @description The unique ID for this financial transaction assigned by the MMO.
     * @example
     * {
     "MTN_INIT": "ABC123",
     "MTN_FINAL": "DEF456"
     }
     */
    correspondentIds: {
        [key: string]: string
    },
}

type AcceptedStatus = CheckStatusBaseResponse & {
    /**
     * @description The payout request has been accepted by pawaPay for processing.
     */
    status: "ACCEPTED"
}

type EnqueuedStatus = CheckStatusBaseResponse & {
    /**
     * @description The payout request has been accepted, but has been enqueued for processing later. Read more about {@link https://docs.pawapay.io/payouts#enqueued-payouts | enqueued payouts}.
     */
    status: "ENQUEUED"
}

type SubmittedStatus = CheckStatusBaseResponse & {
    /**
     * @description The payout request has been submitted to the MMO and is being processed.
     */
    status: "SUBMITTED"
}

type FailedStatus = CheckStatusBaseResponse & {
    /**
     * @description The payout request has been processed, but failed. Final state.
     */
    status: "FAILED",
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
        failureCode:
        | "PAYER_NOT_FOUND"
        | "PAYMENT_NOT_APPROVED"
        | "PAYER_LIMIT_REACHED"
        | "INSUFFICIENT_BALANCE"
        | "TRANSACTION_ALREADY_IN_PROCESS"
        | "OTHER_ERROR"

        /**
         * @description Additional optional failure message
         * @example failureMessage: "Recipient's address is blocked"
         */
        failureMessage: string
    },
}

export type DepositStatus =
    | CompletedStatus
    | AcceptedStatus
    | EnqueuedStatus
    | SubmittedStatus
    | FailedStatus


// * ResendDepositCallback

type ResendDepositBase = {
    /**
     * @description A UUIDv4 based ID specified by you, that uniquely identifies the deposit.
     *
     * Required string length: 36
     *
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    despositId: string
}

type ResendDepositAccepted = ResendDepositBase & {
    /**
     *@description The manual action request has been accepted by pawaPay for processing. */
    status: "ACCEPTED"
}

type ResendDepositRejected = ResendDepositBase & {
    /**
     *@description The manual action request has been rejected by pawaPay. See rejectionReason for details. */
    status: "REJECTED"
    /**
     * @description Human-readable explanation why request has been rejected
     * @example rejectionReason:"Deposit with ID \\#f4401bd2-1568-4140-bf2d-eb77d2b2b639 not found"
     */
    rejectionReason: string

}

type ResendDepositFailed = ResendDepositBase & {
    /**
     *@description The manual action request has failed during submitting for processing due to internal reasons. */
    status: "FAILED"
}

export type ResendDepositResponse =
    | ResendDepositAccepted
    | ResendDepositRejected
    | ResendDepositFailed


// Refund Types

type AcceptedRefund = {
    /**
     * @description The refundId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    refundId: string,
    /**
     * @description The refund request has been accepted by pawaPay for processing.
     */
    status: "ACCEPTED",
    /**
     * ISO Date String
     * @example "2020-10-19T11:17:01Z"
     */
    created: string,
}

type DuplicatedIgnoredRefund = {
    /**
     * @description The refundId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    depositId: string,
    /**
     * @description The refund request has been ignored as a duplicate of an already accepted refund request. Duplication logic relies upon refundId.
     */
    status: "DUPLICATE_IGNORED",
    /**
     * ISO Date String
     * @example "2020-10-19T11:17:01Z"
     */
    created: string
}

type RejectedRefund = {
    /**
     * @description The refundId of the deposit transaction.
     *
     * Required string length: 36
     * @example depositId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    refundId: string,
    /**
     * @description The refund request has been rejected by pawaPay. See rejectionReason for details.
     */
    status: "REJECTED",

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
        rejectionCode: "DEPOSIT_NOT_FOUND" | "DEPOSIT_NOT_COMPLETED" | "ALREADY_REFUNDED" | "IN_PROGRESS" | "INVALID_AMOUNT" | "AMOUNT_TOO_SMALL" | "AMOUNT_TOO_LARGE" | "PARAMETER_INVALID" | "INVALID_INPUT" | "REFUNDS_NOT_ALLOWED" | "CORRESPONDENT_TEMPORARILY_UNAVAILABLE"

        /**
         * Additional optional rejection message
         * @example rejectionMessage: "You don't have access to this correspondent"
         */
        rejectionMessage: string
    }
}

export type RequestRefundResponse =
    | AcceptedRefund
    | RejectedRefund
    | DuplicatedIgnoredRefund


type ResendRefundBase = {
    /**
     * @description The refundId of the refund transaction.
     *
     * Required string length: 36
     *
     * @example refundId: "f4401bd2-1568-4140-bf2d-eb77d2b2b639"
     */
    refundId: string
}

type ResendRefundAccepted = ResendRefundBase & {
    /**
     *@description The manual action request has been accepted by pawaPay for processing. */
    status: "ACCEPTED"
}

type ResendRefundRejected = ResendRefundBase & {
    /**
     *@description The manual action request has been rejected by pawaPay. See rejectionReason for details. */
    status: "REJECTED"
    /**
     * @description Human-readable explanation why request has been rejected
     * @example rejectionReason:"Refund with ID \\#f4401bd2-1568-4140-bf2d-eb77d2b2b639 not found"
     */
    rejectionReason: string
}

type ResendRefundFailed = ResendRefundBase & {
    /**
     *@description The manual action request has failed during submitting for processing due to internal reasons. */
    status: "FAILED"
}

export type ResendRefundCallbackResponse =
    | ResendRefundAccepted
    | ResendRefundRejected
    | ResendRefundFailed


type CheckRefundStatusBase = {
    refundId: string,
    status: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: {
        type: string,
        address: {
            value: string
        }
    },
    customerTimestamp: string,
    statementDescription: string,
    created: string,
    metadata: {}
}

type CheckRefundStatusCompleted = CheckRefundStatusBase & {
    status: "COMPLETED",
    receivedByRecipient: string,
    correspondentIds: {}
}

type CheckRefundStatusAccepted = CheckRefundStatusBase & {
    status: "ACCEPTED",
}

type CheckRefundStatusSubmitted = CheckRefundStatusBase & {
    status: "SUBMITTED",
}

type CheckRefundStatusFailed = CheckRefundStatusBase & {
    status: "FAILED",
    failureReason: {
        failureCode: string,
        failureMessage: string
    }
}

export type CheckRefundStatusResponse =
    | CheckRefundStatusCompleted
    | CheckRefundStatusAccepted
    | CheckRefundStatusSubmitted
    | CheckRefundStatusFailed



export type RefundCallback = {
    refundId: string,
    status: string,
    amount: string,
    currency: string,
    country: string,
    correspondent: string,
    recipient: {
        type: string,
        address: {
            value: string
        }
    },
    customerTimestamp: string,
    statementDescription: string,
    created: string,
    receivedByRecipient: string,
    correspondentIds: {},
    failureReason: {
        failureCode: string,
        failureMessage: string
    },
    metadata: {}
}

// * Wallet types

export type WalletBalance = {
    balances: {
        /**
     * @description The country in which the MMO operates.
     *
     * Format is ISO 3166-1 alpha-3, three character country code in upper case. Read more from {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#Officially_assigned_code_elements | Wikipedia}.
     *
     * @example Example: "MWI"
     */
        country: string,

        /**
         * @description The current balance of the wallet.
         *
         * @example balance: "1000.0"
         */
        balance: string,

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
        currency: string,

        /**
         * @example If you are using a wallet that is only used by a single MMO, that MMO-s correspondent code will be shown here.
         *
         * @example mno: "AIRTEL_MWI"
         */
        mno: string
    }[]

}


type OperationalType = {
    operationType: string,
    minTransactionLimit: string,
    maxTransactionLimit: string,
}

type Correspondent = {
    correspondent: string,
    currency: string,
    ownerName: string,
    operationTypes: Array<OperationalType>
}

interface Countries<T> {
    country: string,
    correspondents: Array<T>
}

export type ActiveConfigurationResponse = {
    merchantId: string,
    merchantName: string,
    countries: Array<Countries<Correspondent>>
}


type CorrespondentOperationalType = {
    operationType: "DEPOSIT" | "PAYOUT"
    status: "OPERATIONAL" | "DELAYED" | "CLOSED"
}

type CorrespondentData = {
    correspondent: string,
    operationaType: Array<CorrespondentOperationalType>
}

export interface AvailableCorrespondentResponse extends Countries<CorrespondentData> {
}

export interface PredictCorrespondentResponse {
    country: string,
    operator: string,
    correspondent: string,
    msisdn: string

}


export type PublicKeysResponse = {
    /**
     * @description The ID of the public key. */
    id: string
    /**
     * @description The public key to use when verifying the signature in a callback sent by pawaPay. */
    key: string
}

