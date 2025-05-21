import { DepositConfig, PawaPayError, DepositResponse, PawaPayResponse, RequestOptions, DepositStatus, ResendDepositResponse, WalletBalance, PublicKeysResponse, ActiveConfigurationResponse, AvailableCorrespondentResponse, PredictCorrespondentResponse, RequestPayPageConfig, RequestPayPageResponse, RequestRefundConfig, RequestRefundResponse } from './types';
export declare class PawaPayClient {
    private apiClient;
    private apiKey;
    private baseUrl;
    constructor(apiKey: string, baseUrl?: string);
    private request;
    requestDeposit(data: DepositConfig, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<DepositResponse, PawaPayError>>;
    checkDepositStatus(depositId: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<DepositStatus, PawaPayError>>;
    resendDepositCallback(depositId: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>>;
    requestRefund(refundConfig: RequestRefundConfig, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<RequestRefundResponse, PawaPayError>>;
    checkRefundStatus(refundId: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<{}, PawaPayError>>;
    resendRefundCallback(refundId: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<{}, PawaPayError>>;
    requestPaymentPage(payload: RequestPayPageConfig, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>>;
    checkWalletBalances({ options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<Array<WalletBalance>, PawaPayError>>;
    checkWalletBalancesByCountry(country: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<Array<WalletBalance>, PawaPayError>>;
    getActiveConfiguration({ options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<ActiveConfigurationResponse, PawaPayError>>;
    getAvailableCorrespondent({ options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<Array<AvailableCorrespondentResponse>, PawaPayError>>;
    predictCorrespondent(msisdn: string, { options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<PredictCorrespondentResponse, PawaPayError>>;
    getPublicKey({ options }?: {
        options?: RequestOptions;
    }): Promise<PawaPayResponse<Array<PublicKeysResponse>, PawaPayError>>;
}
