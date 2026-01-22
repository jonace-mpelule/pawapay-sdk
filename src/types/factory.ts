import { type ClientConfig, PawaPayClient } from "@/client.ts";
import type { V1Methods, V2Methods } from "./methods.t.ts";

export type PawaPayClientV1 = V1Methods;
export type PawaPayClientV2 = V2Methods;

export function createPawaPayClient(
  apiKey: string,
  config?: ClientConfig<"v1"> & { apiVersion?: "v1" },
): PawaPayClientV1;

export function createPawaPayClient(
  apiKey: string,
  config?: ClientConfig<"v2"> & { apiVersion?: "v2" },
): PawaPayClientV2;

export function createPawaPayClient(
  apiKey: string,
  config: ClientConfig<"v1" | "v2">,
) {
  const internalV1 = new PawaPayClient<"v1">(apiKey, {
    apiVersion: "v1",
    environment: config.environment,
  });

  const internalV2 = new PawaPayClient<"v2">(apiKey, {
    apiVersion: "v2",
    environment: config.environment,
  });

  if (config?.apiVersion === "v1") {
    /**
     * NOTE: This binds the version 1 functions
     */
    return {
      requestDeposit: internalV1.requestDeposit.bind(internalV1),
      checkDepositStatus: internalV1.checkDepositStatus.bind(internalV1),
      resendDepositCallback: internalV1.resendDepositCallback.bind(internalV1),
      requestPayout: internalV1.requestPayout.bind(internalV1),
      checkPayoutStatus: internalV1.checkPayoutStatus.bind(internalV1),
      resendPayoutCallback: internalV1.resendPayoutCallback.bind(internalV1),
      cancelEnqueuedPayout: internalV1.cancelEnqueuedPayout.bind(internalV1),
      initiateBulkPayout: internalV1.initiateBulkPayout.bind(internalV1),
      initiateRefund: internalV1.initiateRefund.bind(internalV1),
      checkRefundStatus: internalV1.checkRefundStatus.bind(internalV1),
      resendRefundCallback: internalV1.resendRefundCallback.bind(internalV1),
      requestPayPage: internalV1.requestPayPage.bind(internalV1),
      getWalletBalances: internalV1.getWalletBalances.bind(internalV1),
      getWalletBalancesByCountry:
        internalV1.getWalletBalancesByCountry.bind(internalV1),
      getActiveConfiguration:
        internalV1.getActiveConfiguration.bind(internalV1),
      getProviderAvailability:
        internalV1.getProviderAvailability.bind(internalV1),
      getProviderPrediction: internalV1.getProviderPrediction.bind(internalV1),
      getPublicKeys: internalV1.getPublicKeys.bind(internalV1),
    } as PawaPayClientV1;
  } else {
    /**
     * NOTE: This binds the version 2 functions
     */
    return {
      requestDeposit: internalV2.requestDeposit.bind(internalV1),
      checkDepositStatus: internalV2.checkDepositStatus.bind(internalV1),
      resendDepositCallback: internalV2.resendDepositCallback.bind(internalV1),
      requestPayout: internalV2.requestPayout.bind(internalV1),
      checkPayoutStatus: internalV2.checkPayoutStatus.bind(internalV1),
      resendPayoutCallback: internalV2.resendPayoutCallback.bind(internalV1),
      cancelEnqueuedPayout: internalV2.cancelEnqueuedPayout.bind(internalV1),
      initiateBulkPayout: internalV2.initiateBulkPayout.bind(internalV1),
      initiateRefund: internalV2.initiateRefund.bind(internalV1),
      checkRefundStatus: internalV2.checkRefundStatus.bind(internalV1),
      resendRefundCallback: internalV2.resendRefundCallback.bind(internalV1),
      requestPayPage: internalV2.requestPayPage.bind(internalV1),
      getWalletBalances: internalV2.getWalletBalances.bind(internalV1),
      getActiveConfiguration:
        internalV2.getActiveConfiguration.bind(internalV1),
      getProviderAvailability:
        internalV2.getProviderAvailability.bind(internalV1),
      getProviderPrediction: internalV2.getProviderPrediction.bind(internalV1),
      getPublicKeys: internalV2.getPublicKeys.bind(internalV1),
      /**
       * NOTE: Below are version 2 only
       */
      initiateRemittance: internalV2.initiateRemittance.bind(internalV1),
      resendRemittanceCallback:
        internalV2.resendRemittanceCallback.bind(internalV1),
      checkRemittanceStatus: internalV2.checkRemittanceStatus.bind(internalV1),
      cancelEnqueuedRemittance:
        internalV2.cancelEnqueuedRemittance.bind(internalV1),
      requestStatement: internalV2.requestStatement.bind(internalV1),
      getStatementStatus: internalV2.getStatementStatus.bind(internalV1),
    } as PawaPayClientV2;
  }
}
