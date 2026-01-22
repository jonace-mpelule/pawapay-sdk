/** biome-ignore-all lint/suspicious/noExplicitAny: <'can use any'> */
import axios, { type AxiosInstance } from "axios";
import signale from "signale";
import V1_Implementations from "./fn/v1_implementations.ts";
import V2_Implementations from "./fn/v2_implementations.ts";
import type { V1Methods, V2Methods } from "./types/methods.t.ts";

export type ApiVersion = "v1" | "v2";

export type ClientConfig<T extends ApiVersion> = {
  apiVersion?: T;
  environment?: "live" | "sandbox";
};

export class PawaPayClient<T extends ApiVersion> {
  private apiClient: AxiosInstance;
  protected apiKey: string;
  private config: ClientConfig<T>;
  private v1_Implementation: V1_Implementations;
  private v2_Implementation: V2_Implementations;

  constructor(
    apiKey: string,
    config?: ClientConfig<T> & {
      apiVersion: T;
    },
  ) {
    this.apiKey = apiKey;
    this.config = {
      apiVersion: config?.apiVersion ?? "v2",
      ...config,
    };

    if (this.config.apiVersion === "v1") {
      signale.warn("⚠️ Pawapay v1 is deprecated. Upgrade to v2.");
    }

    const baseURL =
      this.config.apiVersion === "v2"
        ? this.config.environment === "live"
          ? "https://api.pawapay.io/v2"
          : "https://api.sandbox.pawapay.io/v2"
        : this.config.environment === "live"
          ? "https://api.pawapay.io"
          : "https://api.sandbox.pawapay.io";

    this.apiClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    this.v1_Implementation = new V1_Implementations(this.apiClient);
    this.v2_Implementation = new V2_Implementations(this.apiClient);

    /**
     * NOTE: Register Methods
     */

    if (this.config.apiVersion === "v1") {
      this.requestDeposit = this.v1_Implementation.requestDeposit as any;
      this.checkDepositStatus = this.v1_Implementation
        .checkDepositStatus as any;
      this.resendDepositCallback = this.v1_Implementation
        .resendDepositCallback as any;
      this.checkPayoutStatus = this.v1_Implementation.checkPayoutStatus as any;
      this.requestPayout = this.v1_Implementation.requestPayout as any;
      this.cancelEnqueuedPayout = this.v1_Implementation
        .cancelEnqueuedPayout as any;
      this.resendPayoutCallback = this.v1_Implementation
        .resendPayoutCallback as any;
      this.initiateRefund = this.v1_Implementation.initiateRefund as any;
      this.initiateBulkPayout = this.v1_Implementation
        .initiateBulkPayout as any;
      this.checkRefundStatus = this.v1_Implementation.checkRefundStatus as any;
      this.resendRefundCallback = this.v1_Implementation
        .resendRefundCallback as any;
      this.requestPayPage = this.v1_Implementation.requestPayPage as any;
      this.getWalletBalances = this.v1_Implementation.getWalletBalances as any;
      this.getWalletBalancesByCountry = this.v1_Implementation
        .getWalletBalancesByCountry as any;
      this.getActiveConfiguration = this.v1_Implementation
        .getActiveConfiguration as any;
      this.getProviderAvailability = this.v1_Implementation
        .getProviderAvailability as any;
      this.getProviderPrediction = this.v1_Implementation
        .getProviderPrediction as any;
      this.getPublicKeys = this.v1_Implementation.getPublicKeys as any;
    }

    if (this.config.apiVersion === "v2") {
      this.requestDeposit = this.v2_Implementation.requestDeposit as any;
      this.checkDepositStatus = this.v2_Implementation
        .checkDepositStatus as any;
      this.resendDepositCallback = this.v2_Implementation
        .resendDepositCallback as any;
      this.checkPayoutStatus = this.v2_Implementation.checkPayoutStatus as any;
      this.requestPayout = this.v2_Implementation.requestPayout as any;
      this.cancelEnqueuedPayout = this.v2_Implementation
        .cancelEnqueuedPayout as any;
      this.resendPayoutCallback = this.v2_Implementation
        .resendPayoutCallback as any;
      this.initiateBulkPayout = this.v2_Implementation
        .initiateBulkPayout as any;
      this.initiateRefund = this.v2_Implementation.initiateRefund as any;
      this.checkRefundStatus = this.v2_Implementation.checkRefundStatus as any;
      this.resendRefundCallback = this.v2_Implementation
        .resendRefundCallback as any;
      this.initiateRemittance = this.v2_Implementation
        .initiateRemittance as any;
      this.resendRemittanceCallback = this.v2_Implementation
        .resendRemittanceCallback as any;
      this.checkRemittanceStatus = this.v2_Implementation
        .checkRemittanceStatus as any;
      this.cancelEnqueuedRemittance = this.v2_Implementation
        .cancelEnqueuedRemittance as any;
      this.requestPayPage = this.v2_Implementation.requestPayPage as any;
      this.getWalletBalances = this.v2_Implementation.getWalletBalances as any;
      this.requestStatement = this.v2_Implementation.requestStatement as any;
      this.getStatementStatus = this.v2_Implementation
        .getStatementStatus as any;
      this.getActiveConfiguration = this.v2_Implementation
        .getActiveConfiguration as any;
      this.getProviderAvailability = this.v2_Implementation
        .getProviderAvailability as any;
      this.getProviderPrediction = this.v2_Implementation
        .getProviderPrediction as any;
      this.getPublicKeys = this.v2_Implementation.getPublicKeys as any;
    }
  }

  requestDeposit!: T extends "v1"
    ? V1Methods["requestDeposit"]
    : V2Methods["requestDeposit"];

  checkDepositStatus!: T extends "v1"
    ? V1Methods["checkDepositStatus"]
    : V2Methods["checkDepositStatus"];

  resendDepositCallback!: T extends "v1"
    ? V1Methods["resendDepositCallback"]
    : V2Methods["resendDepositCallback"];

  checkPayoutStatus!: T extends "v1"
    ? V1Methods["checkPayoutStatus"]
    : V2Methods["checkPayoutStatus"];

  requestPayout!: T extends "v1"
    ? V1Methods["requestPayout"]
    : V2Methods["requestPayout"];

  cancelEnqueuedPayout!: T extends "v1"
    ? V1Methods["cancelEnqueuedPayout"]
    : V2Methods["cancelEnqueuedPayout"];

  resendPayoutCallback!: T extends "v1"
    ? V1Methods["resendPayoutCallback"]
    : V2Methods["resendPayoutCallback"];

  initiateBulkPayout!: T extends "v1"
    ? V1Methods["initiateBulkPayout"]
    : V2Methods["initiateBulkPayout"];

  initiateRefund!: T extends "v1"
    ? V1Methods["initiateRefund"]
    : V2Methods["initiateRefund"];

  checkRefundStatus!: T extends "v1"
    ? V1Methods["checkRefundStatus"]
    : V2Methods["checkRefundStatus"];

  resendRefundCallback!: T extends "v1"
    ? V1Methods["resendRefundCallback"]
    : V2Methods["resendRefundCallback"];

  initiateRemittance!: T extends "v1" ? never : V2Methods["initiateRemittance"];

  resendRemittanceCallback!: T extends "v1"
    ? never
    : V2Methods["resendRemittanceCallback"];

  checkRemittanceStatus!: T extends "v1"
    ? never
    : V2Methods["checkRemittanceStatus"];

  cancelEnqueuedRemittance!: T extends "v1"
    ? never
    : V2Methods["cancelEnqueuedRemittance"];

  requestPayPage!: T extends "v1"
    ? V1Methods["requestPayPage"]
    : V2Methods["requestPayPage"];

  getWalletBalances!: T extends "v1"
    ? V1Methods["getWalletBalances"]
    : V2Methods["getWalletBalances"];
  getWalletBalancesByCountry!: T extends "v1"
    ? V1Methods["getWalletBalancesByCountry"]
    : never;

  requestStatement!: T extends "v1" ? never : V2Methods["requestStatement"];

  getStatementStatus!: T extends "v1" ? never : V2Methods["getStatementStatus"];

  getActiveConfiguration!: T extends "v1"
    ? V1Methods["getActiveConfiguration"]
    : V2Methods["getActiveConfiguration"];

  getProviderAvailability!: T extends "v1"
    ? V1Methods["getProviderAvailability"]
    : V2Methods["getProviderAvailability"];

  getProviderPrediction!: T extends "v1"
    ? V1Methods["getProviderAvailability"]
    : V2Methods["getProviderPrediction"];

  getPublicKeys!: T extends "v1"
    ? V1Methods["getPublicKeys"]
    : V2Methods["getPublicKeys"];
}
