/** biome-ignore-all lint/correctness/noUnusedImports: <''> */
import type { AxiosInstance } from "axios";
import Endpoints from "@/helpers/endpoints.ts";
import type { ResendDepositCallbackResponse_v2 } from "@/types/v2/deposits.t.ts";
import type {
  PawaPayError,
  PawaPayResponse,
  PublicKeysResponse,
  RequestOptions,
  RequestPayPageResponse,
} from "@/types/index.t.ts";
import type { V2Methods } from "@/types/methods.t.ts";
import type { ActiveConfiguration } from "@/types/v2/active-conf.t.ts";
import type {
  DepositConfig_v2,
  DepositResponse_v2,
  DepositStatusResponse_v2,
} from "@/types/v2/deposits.t.ts";
import type {
  BulkPayoutResponse_v2,
  CancelEnqueuedPayoutResponse_v2,
  CheckPayoutStatus_v2,
  RequestPayoutConfig_v2,
  RequestPayoutResponse_v2,
  ResendPayoutCallbackResponse_v2,
} from "@/types/v2/payouts.t.ts";
import type { RequestPayPageConfig_v2 } from "@/types/v2/paypage.t.ts";
import type {
  RefundStatusResponse_v2,
  RequestRefundConfig_v2,
  RequestRefundResponse_v2,
  ResendRefundCallbackResponse_v2,
} from "@/types/v2/refunds.t.ts";
import type {
  CancelEnqueuedRemittanceResponse,
  CheckRemittanceStatusResponse,
  InitiateRemittanceConfig,
  InitiateRemittanceResponse,
  ResendRemittanceCallbackResponse,
} from "@/types/v2/remittence.t.ts";
import type {
  CheckStatementStaus_v2,
  RequestStatementConfig,
  RequestStatementResponse_v2,
} from "@/types/v2/statements.t.ts";
import type {
  ProviderAvailability_v2,
  ProviderPrediction_v2,
  WalletBalance_v2,
} from "@/types/v2/toolkit.t.ts";
import request from "./axios.fn.ts";

export default class V2_Implementations implements V2Methods {
  apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  /**
   * INFO: Deposits
   */

  requestDeposit(
    data: DepositConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.deposits.requestDeposit,
        data,
      },
      args.options,
    );
  }

  checkDepositStatus(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositStatusResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.deposits.getDepositStatus(depositId),
      },
      args.options,
    );
  }

  async resendDepositCallback(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendDepositCallbackResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.deposits.resendDepositCallback(depositId),
      },
      args.options,
    );
  }

  /**
   * INFO: Payouts
   */

  async requestPayout(
    data: RequestPayoutConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayoutResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data,
        url: Endpoints.v2.payouts.requestPayout,
      },
      args.options,
    );
  }

  async checkPayoutStatus(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckPayoutStatus_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: `/payouts/${payoutId}`,
      },
      args.options,
    );
  }

  async cancelEnqueuedPayout(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "DELETE",
        url: Endpoints.v2.payouts.cancelPayout(payoutId),
      },
      args.options,
    );
  }

  async resendPayoutCallback(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendPayoutCallbackResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: `/payouts/${payoutId}/resend-callback`,
      },
      args.options,
    );
  }

  async initiateBulkPayout(
    data: Array<RequestPayoutConfig_v2>,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<BulkPayoutResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data,
        url: Endpoints.v2.payouts.initiateBulkPayout,
      },
      args.options,
    );
  }

  /**
   * NOTE: Refunds
   */

  async initiateRefund(
    data: RequestRefundConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestRefundResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data,
        url: Endpoints.v2.refunds.initiateRefund,
      },
      args.options,
    );
  }

  async checkRefundStatus(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RefundStatusResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.refunds.checkRefundStatus(refundId),
      },
      args.options,
    );
  }

  async resendRefundCallback(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRefundCallbackResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.refunds.resendRefundCallback(refundId),
      },
      args.options,
    );
  }

  /**
   * INFO: Remittances
   */

  async initiateRemittance(
    data: InitiateRemittanceConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<InitiateRemittanceResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data,
        url: Endpoints.v2.remittences.initiateRemittance,
      },
      args.options,
    );
  }

  async resendRemittanceCallback(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRemittanceCallbackResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.remittences.resendRemittenceCallback(remittanceId),
      },
      args.options,
    );
  }

  async checkRemittanceStatus(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckRemittanceStatusResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.remittences.getRemittanceStatus(remittanceId),
      },
      args.options,
    );
  }

  async cancelEnqueuedRemittance(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedRemittanceResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.remittences.cancelEnqueuedRemittance(remittanceId),
      },
      args.options,
    );
  }

  /**
   * NOTE: PayPage
   */

  async requestPayPage(
    data: RequestPayPageConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data,
        url: Endpoints.v2.requestPayPage,
      },
      args.options,
    );
  }

  /**
   * NOTE: Financies
   */
  async getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.financial.getWalletBalances,
      },
      args.options,
    );
  }

  async requestStatement(
    data: RequestStatementConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestStatementResponse_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        url: Endpoints.v2.financial.requestStatement,
        data,
      },
      args.options,
    );
  }

  async getStatementStatus(
    statementId: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<CheckStatementStaus_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.financial.getStatementStatus(statementId),
      },
      args.options,
    );
  }

  /**
   * NOTE: ToolKit
   */

  async getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfiguration, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.toolkit.getActiveConfiguration,
      },
      args.options,
    );
  }

  async getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ProviderAvailability_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.toolkit.getProviderAvailability,
      },
      args.options,
    );
  }

  async getProviderPrediction(
    phoneNumber: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<ProviderPrediction_v2, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "POST",
        data: { phoneNumber },
        url: Endpoints.v2.toolkit.getProviderPrediction,
      },
      args.options,
    );
  }

  async getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse, PawaPayError>> {
    return request(
      this.apiClient,
      {
        method: "GET",
        url: Endpoints.v2.toolkit.getPublicKeys,
      },
      args.options,
    );
  }
}
