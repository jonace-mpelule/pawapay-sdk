const Endpoints = {
  v1: {},
  v2: {
    deposits: {
      requestDeposit: "/deposits",
      getDepositStatus: (depositId: string) => `/deposits/${depositId}`,
      resendDepositCallback: (depositId: string) =>
        `/deposits/resend-callback/${depositId}`,
    },

    payouts: {
      requestPayout: "/payouts",
      getPayoutStatus: (payoutId: string) => `/payouts/${payoutId}`,
      resendPayoutCallback: (payoutId: string) =>
        `/payouts/resend-callback/${payoutId}`,
      cancelPayout: (payoutId: string) => `/payouts/fail-enqueued/${payoutId}`,
      initiateBulkPayout: "/payouts/bulk",
    },

    refunds: {
      initiateRefund: "/refunds",
      checkRefundStatus: (refundId: string) => `/refunds/${refundId}`,
      resendRefundCallback: (refundId: string) =>
        `/refunds/resend-callback/${refundId}`,
    },

    remittences: {
      initiateRemittance: "/remittances",
      cancelEnqueuedRemittance: (remittanceId: string) =>
        `/remittances/fail-enqueued/${remittanceId}`,
      getRemittanceStatus: (remittanceId: string) =>
        `/remittances/${remittanceId}`,
      resendRemittenceCallback: (remittanceId: string) =>
        `/remittances/resend-callback/${remittanceId}`,
    },

    requestPayPage: "/paymentpage",

    financial: {
      getWalletBalances: "/wallet-balances",
      getStatementStatus: (statementId: string) => `/statements/${statementId}`,
      requestStatement: "/statements",
    },

    toolkit: {
      getActiveConfiguration: "/active-conf",
      getProviderAvailability: "/availability",
      getProviderPrediction: "/predict-provider",
      getPublicKeys: "/public-key/http",
    },
  },
};

export default Endpoints;
