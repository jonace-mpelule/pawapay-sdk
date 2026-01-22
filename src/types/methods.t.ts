import type { ResendDepositCallbackResponse_v2 } from "./v2/deposits.t.ts";
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
} from "./index.t.ts";
import type { ActiveConfiguration } from "./v2/active-conf.t.ts";
import type {
  DepositConfig_v2,
  DepositResponse_v2,
  DepositStatusResponse_v2,
} from "./v2/deposits.t.ts";
import type {
  BulkPayoutResponse_v2,
  CancelEnqueuedPayoutResponse_v2,
  CheckPayoutStatus_v2,
  RequestPayoutConfig_v2,
  RequestPayoutResponse_v2,
  ResendPayoutCallbackResponse_v2,
} from "./v2/payouts.t.ts";
import type { RequestPayPageConfig_v2 } from "./v2/paypage.t.ts";
import type {
  RefundStatusResponse_v2,
  RequestRefundConfig_v2,
  RequestRefundResponse_v2,
  ResendRefundCallbackResponse_v2,
} from "./v2/refunds.t.ts";
import type {
  CancelEnqueuedRemittanceResponse,
  CheckRemittanceStatusResponse,
  InitiateRemittanceConfig,
  InitiateRemittanceResponse,
  ResendRemittanceCallbackResponse,
} from "./v2/remittence.t.ts";
import type {
  CheckStatementStaus_v2,
  RequestStatementConfig,
  RequestStatementResponse_v2,
} from "./v2/statements.t.ts";
import type {
  ProviderAvailability_v2,
  ProviderPrediction_v2,
  WalletBalance_v2,
} from "./v2/toolkit.t.ts";

export type V1Methods = {
  // --- DEPOSITS
  requestDeposit(
    data: DepositConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositResponse, PawaPayError>>;

  checkDepositStatus(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositStatus[], PawaPayError>>;

  resendDepositCallback(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendDepositResponse, PawaPayError>>;

  // --- PAYOUTS
  requestPayout(
    data: RequestPayoutConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayoutRespose, PawaPayError>>;

  checkPayoutStatus(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckPayoutStatusResponse[], PawaPayError>>;

  resendPayoutCallback(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendPayoutCallbackResponse, PawaPayError>>;

  cancelEnqueuedPayout(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse, PawaPayError>>;

  initiateBulkPayout(
    data: RequestBulkPayoutConfig[],
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestBuildPayoutResponse[], PawaPayError>>;

  // --- REFUNDS
  initiateRefund(
    refundConfig: RequestRefundConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestRefundResponse, PawaPayError>>;

  checkRefundStatus(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckRefundStatusResponse[], PawaPayError>>;

  resendRefundCallback(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRefundCallbackResponse, PawaPayError>>;

  // --- PAYMENT PAGE
  requestPayPage(
    payload: RequestPayPageConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>>;

  // --- WALLETS
  getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance, PawaPayError>>;

  getWalletBalancesByCountry(
    country: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<WalletBalance, PawaPayError>>;

  // --- TOOLKIT
  getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfigurationResponse, PawaPayError>>;

  getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<AvailableCorrespondentResponse[], PawaPayError>>;

  getProviderPrediction(
    msisdn: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<PredictCorrespondentResponse, PawaPayError>>;

  getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse[], PawaPayError>>;
};

export type V2Methods = {
  requestDeposit(
    data: DepositConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositResponse_v2, PawaPayError>>;

  checkDepositStatus(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<DepositStatusResponse_v2, PawaPayError>>;

  resendDepositCallback(
    depositId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendDepositCallbackResponse_v2, PawaPayError>>;

  checkPayoutStatus(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckPayoutStatus_v2, PawaPayError>>;

  // --- PAYOUTS
  requestPayout(
    data: RequestPayoutConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayoutResponse_v2, PawaPayError>>;

  cancelEnqueuedPayout(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedPayoutResponse_v2, PawaPayError>>;

  resendPayoutCallback(
    payoutId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendPayoutCallbackResponse_v2, PawaPayError>>;

  initiateBulkPayout(
    data: Array<RequestPayoutConfig_v2>,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<BulkPayoutResponse_v2, PawaPayError>>;

  initiateRefund(
    data: RequestRefundConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestRefundResponse_v2, PawaPayError>>;

  checkRefundStatus(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RefundStatusResponse_v2, PawaPayError>>;

  resendRefundCallback(
    refundId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRefundCallbackResponse_v2, PawaPayError>>;

  initiateRemittance(
    data: InitiateRemittanceConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<InitiateRemittanceResponse, PawaPayError>>;

  resendRemittanceCallback(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<ResendRemittanceCallbackResponse, PawaPayError>>;

  checkRemittanceStatus(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CheckRemittanceStatusResponse, PawaPayError>>;

  cancelEnqueuedRemittance(
    remittanceId: string,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<CancelEnqueuedRemittanceResponse, PawaPayError>>;

  requestPayPage(
    data: RequestPayPageConfig_v2,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestPayPageResponse, PawaPayError>>;

  getWalletBalances(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<WalletBalance_v2, PawaPayError>>;

  requestStatement(
    data: RequestStatementConfig,
    args?: { options?: RequestOptions },
  ): Promise<PawaPayResponse<RequestStatementResponse_v2, PawaPayError>>;

  getStatementStatus(
    statementId: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<CheckStatementStaus_v2, PawaPayError>>;

  getActiveConfiguration(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ActiveConfiguration, PawaPayError>>;

  getProviderAvailability(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<ProviderAvailability_v2, PawaPayError>>;

  getProviderPrediction(
    phoneNumber: string,
    args?: {
      options?: RequestOptions;
    },
  ): Promise<PawaPayResponse<ProviderPrediction_v2, PawaPayError>>;

  getPublicKeys(args?: {
    options?: RequestOptions;
  }): Promise<PawaPayResponse<PublicKeysResponse, PawaPayError>>;
};
