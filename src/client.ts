import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    DepositConfig,
    PawaPayError,
    DepositResponse,
    PawaPayResponse,
    RequestOptions,
    DepositStatus,
    ResendDepositResponse,
    WalletBalance,
    PublicKeysResponse,
    ActiveConfigurationResponse,
    AvailableCorrespondentResponse,
    PredictCorrespondentResponse,
    RequestPayPageConfig,
    RequestPayPageResponse,
    RequestRefundConfig,
    RequestRefundResponse,
    ResendRefundCallbackResponse,
    RequestPayoutConfig,
    RequestPayoutRespose,
    CheckPayoutStatusResponse,
    CancelEnqueuedPayoutResponse,
    RequestBulkPayoutConfig,
    RequestBuildPayoutResponse,
    ResendPayoutCallbackResponse,
    CheckRefundStatusResponse
} from './types/index.t.ts';

type Args = {
    options?: RequestOptions;
};

type ClientConfig = {
    environment?: "live" | "sandbox",
    overrideUrl?: string
}

export class PawaPayClient {
    private apiClient: AxiosInstance;
    protected apiKey: string;
    private config?: ClientConfig;

    constructor(apiKey: string, config?: ClientConfig,) {
        this.apiKey = apiKey;
        this.config = config
        this.apiClient = axios.create({
            baseURL: config?.overrideUrl ?? config?.environment == "live" ? 'https://api.pawapay.io' : 'https://api.sandbox.pawapay.io',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
    }

    private async request<T, E>(config: AxiosRequestConfig, options?: RequestOptions)
        : Promise<PawaPayResponse<T, E>> {
        try {
            const response = await this.apiClient.request<T>(config);
            return {
                success: true,
                data: response.data,
                status: response.status,
                headers: response.headers
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    success: false,
                    error: error.response?.data || error.message,
                    status: error.response?.status || 500
                }
            }
            return {
                success: false,
                error: {
                    errorMessage: 'Unknown error occurred'
                } as E,
                status: 500
            };
        }
    }

    // --- Deposits

    async requestDeposit(data: DepositConfig, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<DepositResponse, PawaPayError>> {

        return this.request({
            method: 'POST',
            url: '/deposits',
            data,
        }, options)
    }


    async checkDepositStatus(depositId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<DepositStatus[], PawaPayError>> {
        return this.request({
            method: 'GET',
            url: `/deposits/${depositId}`
        }, options)
    }

    async resendDepositCallback(depositId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>> {
        var data = { depositId }
        return this.request({
            method: 'POST',
            url: '/deposits/resend-callback',
            data,
        }, options)
    }

    // --- PAYOUTS

    async requestPayout(data: RequestPayoutConfig, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<RequestPayoutRespose, PawaPayError>> {
        return this.request({
            method: 'POST',
            url: '/payouts',
            data
        }, options)
    }

    async checkPayoutStatus(payoutId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<CheckPayoutStatusResponse[], PawaPayError>> {
        return this.request({
            method: 'GET',
            url: `/payouts/${payoutId}`
        }, options)
    }

    async resendPayoutCallback(payoutId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<ResendPayoutCallbackResponse, PawaPayError>> {
        const data = { payoutId }
        return this.request({
            method: 'POST',
            url: '/payouts/resend-callback',
            data
        }, options)
    }

    async cancelEnqueuedPayout(payoutId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<CancelEnqueuedPayoutResponse, PawaPayError>> {
        return this.request({
            method: 'POST',
            url: `/payouts/fail-enqueued/${payoutId}`,
        }, options)
    }

    async requestBulkPayout(data: RequestBulkPayoutConfig[], { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<RequestBuildPayoutResponse[], PawaPayError>> {
        return this.request({
            method: 'POST',
            url: '/payouts/bulk',
            data,
        }, options)
    }

    // --- REFUND
    async requestRefund(refundConfig: RequestRefundConfig, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<RequestRefundResponse, PawaPayError>> {
        return this.request({
            method: "POST",
            url: '/refunds',
            data: refundConfig
        }, options)
    }

    async checkRefundStatus(refundId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<CheckRefundStatusResponse[], PawaPayError>> {
        return this.request({
            method: 'GET',
            url: `/refunds/${refundId}`
        }, options)
    }

    async resendRefundCallback(refundId: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<ResendRefundCallbackResponse, PawaPayError>> {
        return this.request({
            method: 'POST',
            url: '/refund/resend-callback',
            data: { refundId }
        }, options)
    }

    // --- PAYMENT PAGE

    async requestPaymentPage(payload: RequestPayPageConfig, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>> {
        return this.request({
            method: 'POST',
            url: '/v1/widget/sessions',
            data: payload
        })
    }

    // --- WALLETS

    async checkWalletBalances({ options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<WalletBalance, PawaPayError>> {
        return this.request({
            method: 'GET',
            url: '/v1/wallet-balances'
        }, options)
    }

    async checkWalletBalancesByCountry(country: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<WalletBalance, PawaPayError>> {
        return this.request({
            method: 'GET',
            url: `/v1/wallet-balances/${country}`
        })
    }

    // --- TOOLKIT

    async getActiveConfiguration({ options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<ActiveConfigurationResponse, PawaPayError>> {
        return this.request({
            method: `GET`,
            url: `/active-conf`
        }, options)
    }

    async getAvailableCorrespondent({ options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<AvailableCorrespondentResponse[], PawaPayError>> {
        return this.request({
            method: 'GET',
            url: '/availability'
        }, options)
    }

    redictCorrespondent(msisdn: string, { options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<PredictCorrespondentResponse, PawaPayError>> {
        const data = { msisdn }
        return this.request({
            method: 'GET',
            url: '/v1/predict-correspondent',
            data
        }, options)
    }

    getPublicKey({ options }: { options?: RequestOptions } = {})
        : Promise<PawaPayResponse<PublicKeysResponse[], PawaPayError>> {
        return this.request({
            method: 'GET',
            url: '/public-key/https'
        }, options)
    }
}