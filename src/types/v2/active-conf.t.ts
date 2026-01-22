export type OperationTypeCode =
  | "DEPOSIT"
  | "PAYOUT"
  | "REFUND"
  | "REMITTANCE"
  | "USSD_DEPOSIT"
  | "NAME_LOOKUP";

export type OperationStatus = "OPERATIONAL" | "DELAYED" | "CLOSED";

export type DecimalsInAmount = "NONE" | "FIXED" | "VARIABLE";

export type AuthType = "PROVIDER_AUTH";
export type PinPromptType = "AUTOMATIC" | "MANUAL";
export type ChannelType = "USSD";

export interface ActiveConfiguration {
  companyName: string;
  signatureConfiguration: SignatureConfiguration;
  countries: Country[];
}

export interface SignatureConfiguration {
  signedRequestsOnly: boolean;
  signedCallbacks: boolean;
}

export interface DisplayName {
  en: string;
  fr: string;
}

export interface Country {
  country: string;
  displayName: DisplayName;
  prefix: string;
  flag: string;
  providers: Provider[];
}

export interface Provider {
  provider: string;
  displayName: string;
  logo: string;
  nameDisplayedToCustomer: string;
  currencies: Currency[];
}

export interface Currency {
  currency: string;
  displayName: string;
  operationTypes: OperationType[];
}

export interface OperationType {
  operationType: OperationTypeCode;
  config?: DepositConfig;
  minTransactionLimit?: string;
  maxTransactionLimit?: string;
  decimalsInAmount?: DecimalsInAmount;
  status?: OperationStatus;
  callbackUrl?: string;
}

export interface PinPromptInstructions {
  channels: Channel[];
}

export interface Channel {
  type: ChannelType;
  displayName: DisplayName;
  quickLink: string;
  variables: Variables;
  instructions: Instructions;
}

export interface Variables {
  shortCode: string;
}

export interface Instructions {
  en: Instruction[];
  fr: Instruction[];
}

export interface Instruction {
  text: string;
  template: string;
}

export interface DepositConfig {
  authType: AuthType;
  pinPrompt: PinPromptType;
  pinPromptRevivable: boolean;
  pinPromptInstructions: PinPromptInstructions;
}
