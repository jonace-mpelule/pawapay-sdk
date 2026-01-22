export type RequestStatementConfig = {
  wallet: { country: string; currency: string; provider: string };
  callbackUrl: string;
  startDate: string;
  endDate: string;
  compressed: boolean;
};

export type RequestStatementResponse_v2 =
  | {
      status: "ACCEPTED";
      statementId: string;
      created: string;
    }
  | {
      status: "REJECTED";
      failureReason: {
        failureCode:
          | "INVALID_CALLBACK_URL"
          | "INVALID_DATE_RANGE"
          | "WALLET_NOT_FOUND";
        failureMessage: string;
      };
    };

type StatementWallet = {
  currency: string;
  country: string;
  provider: string;
};

type StatementData =
  | {
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
    }
  | {
      statementId: string;
      status: "PROCESSING";
      wallet: StatementWallet;
      created: string;
      startDate: string;
      endDate: string;
    }
  | {
      statementId: string;
      status: "FAILED";
      wallet: StatementWallet;
      created: string;
      startDate: string;
      endDate: string;
      failedAt: string;
    };

export type CheckStatementStaus_v2 =
  | {
      status: "FOUND";
      data: StatementData;
    }
  | {
      status: "NOT_FOUND";
    };

export type StatementCallback_v2 = {
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
