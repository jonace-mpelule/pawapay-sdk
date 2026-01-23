import type { AxiosInstance } from "axios";
import type {
  ActiveConfigurationResponse,
  AvailableCorrespondentResponse,
  CancelEnqueuedPayoutResponse,
  CheckPayoutStatusResponse,
  CheckRefundStatusResponse,
  DepositConfig,
  DepositResponse,
  DepositStatus,
  PawaPayError,
  PawaPayResponse,
  PredictCorrespondentResponse,
  PublicKeysResponse,
  RequestBuildPayoutResponse,
  RequestBulkPayoutConfig,
  RequestOptions,
  RequestPayoutConfig,
  RequestPayoutRespose,
  RequestPayPageConfig,
  RequestPayPageResponse,
  RequestRefundConfig,
  RequestRefundResponse,
  ResendDepositResponse,
  ResendPayoutCallbackResponse,
  ResendRefundCallbackResponse,
  WalletBalance,
} from "@/types/index.t.ts";

import type { V1Methods } from "@/types/methods.t.ts";

import request from "./axios.fn.ts";

export default class V1_Implementations implements V1Methods {
  private apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  async resendDepositCallback(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>> {
    const data = { depositId };
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/deposits/resend-callback",
        data,
      },
      args?.options,
    );
  }

  async requestDeposit(
    data: DepositConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/deposits",
        data,
      },
      args?.options,
    );
  }

  async checkDepositStatus(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositStatus[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: `/deposits/${depositId}`,
      },
      args?.options,
    );
  }

  async requestPayout(
    data: RequestPayoutConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayoutRespose, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/payouts",
        data,
      },
      args?.options,
    );
  }

  async checkPayoutStatus(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckPayoutStatusResponse[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: `/payouts/${payoutId}`,
      },
      args?.options,
    );
  }

  async resendPayoutCallback(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendPayoutCallbackResponse, PawaPayError>> {
    const data = { payoutId };
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/payouts/resend-callback",
        data,
      },
      args?.options,
    );
  }

  async cancelEnqueuedPayout(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: `/payouts/fail-enqueued/${payoutId}`,
      },
      args?.options,
    );
  }

  async initiateBulkPayout(
    data: RequestBulkPayoutConfig[],
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestBuildPayoutResponse[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/payouts/bulk",
        data,
      },
      args?.options,
    );
  }
  // --- REFUND
  async initiateRefund(
    refundConfig: RequestRefundConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestRefundResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/refunds",
        data: refundConfig,
      },
      args?.options,
    );
  }
  async checkRefundStatus(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckRefundStatusResponse[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: `/refunds/${refundId}`,
      },
      args?.options,
    );
  }

  async resendRefundCallback(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRefundCallbackResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/refund/resend-callback",
        data: { refundId },
      },
      args?.options,
    );
  }

  // --- PAYMENT PAGE

  async requestPayPage(
    payload: RequestPayPageConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/v1/widget/sessions",
        data: payload,
      },
      args?.options,
    );
  }
  // --- WALLETS

  async getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: "/v1/wallet-balances",
      },
      args?.options,
    );
  }

  async getWalletBalancesByCountry(
    country: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<WalletBalance, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: `/v1/wallet-balances/${country}`,
      },
      args?.options,
    );
  }

  // --- TOOLKIT

  async getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfigurationResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: `GET`,
        url: `/active-conf`,
      },
      args?.options,
    );
  }

  async resendDepositCallbackV1(
    depositId: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>> {
    const data = { depositId };
    return request(
      this.apiClient,
      {
        method: "POST",
        url: "/deposits/resend-callback",
        data,
      },
      args?.options,
    );
  }

  async getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<AvailableCorrespondentResponse[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: "/availability",
      },
      args?.options,
    );
  }

  async getProviderPrediction(
    msisdn: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<PredictCorrespondentResponse, PawaPayError>> {
    const data = { msisdn };
    return request(
      this.apiClient,
      {
        method: "GET",
        url: "/v1/predict-correspondent",
        data,
      },
      args?.options,
    );
  }

  async getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse[], PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: "/public-key/https",
      },
      args?.options,
    );
  }
}
