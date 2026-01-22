# PawaPay SDK for Node.js

<p align="center">
  <img src="https://cdn.prod.website-files.com/62824591015aa314fd308df1/66cf1b87a6a22a3cb5511621_Logo-3.svg" alt="pawaPay Logo" width="220"/>
</p>

<p align="center">
  <b>This SDK is a one-to-one mapping with the official <a href="https://docs.pawapay.io/v1/api-reference/">pawaPay API documentation</a>.</b><br/>
  Please always refer to the official docs for the most up-to-date API details.<br/>
  <a href="https://docs.pawapay.io/v1/api-reference/">https://docs.pawapay.io/v1/api-reference/</a>
</p>

[![npm](https://img.shields.io/npm/v/pawapay-sdk)](https://www.npmjs.com/package/pawapay-sdk)
[![npm downloads](https://img.shields.io/npm/dm/pawapay-sdk)](https://www.npmjs.com/package/pawapay-sdk)
[![GitHub stars](https://img.shields.io/github/stars/jonace-mpelule/pawapay-sdk?style=social)](https://github.com/jonace-mpelule/pawapay-sdk)
[![GitHub issues](https://img.shields.io/github/issues/jonace-mpelule/pawapay-sdk)](https://github.com/jonace-mpelule/pawapay-sdk/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/jonace-mpelule/pawapay-sdk)](https://github.com/jonace-mpelule/pawapay-sdk/commits/main)

A comprehensive TypeScript/JavaScript SDK for integrating with the pawaPay API, enabling seamless mobile money operations. This SDK supports the latest **API Version 2**.

## Features
- **Deposits**: Initiate, check status, and manage deposit transactions.
- **Payouts**: Send single or bulk payouts, check payout status, resend callbacks, and cancel enqueued payouts.
- **Refunds**: Initiate refunds, check refund status, and resend refund callbacks.
- **Remittances**: Initiate cross-border remittances, check status, and manage callbacks.
- **Wallets**: Retrieve wallet balances.
- **Statements**: Request financial statements and check their generation status.
- **Payment Pages**: Generate hosted payment pages for customer payments.
- **Toolkit**: Access configuration, available providers, provider prediction, and public keys.

## Installation
```bash
npm install pawapay-sdk@latest
```

## Generating UUIDs for Transaction IDs
You can generate UUIDs for `depositId`, `payoutId`, `refundId`, etc., using the [uuid](https://www.npmjs.com/package/uuid) package (version 4):

```bash
npm install uuid
```

```typescript
import { v4 as uuidv4 } from 'uuid';

const depositId = uuidv4();
const payoutId = uuidv4();
```

## Usage
Initialize the client with your API Key and configuration.

```typescript
import { createPawaPayClient } from 'pawapay-sdk';

const client = createPawaPayClient('YOUR_API_KEY', {
  apiVersion: 'v2',
  environment: 'sandbox', // or 'live'
});
```
 _‼️ **Note**: V1 is deprecated. Please migrate to V2 for the latest features and support._


## API Reference & Examples

### Deposits
- **requestDeposit(data, options?)**: Initiate a deposit.
```typescript
import { v4 as uuidv4 } from 'uuid';
import type { DepositConfig_v2 } from "pawapay-sdk";

const depositConfig: DepositConfig_v2 = {
  depositId: uuidv4(),
  amount: "100.00",
  currency: "MWK",
  payer: {
    type: "MMO",
    accountDetails: {
      phoneNumber: "+265999644321",
      provider: "AIRTEL_MWI",
    },
  },
  customerMessage: "Payment for order #123",
  metadata: [
    {
      orderId: "or_213243455332",
    },
  ],
};

const deposit = await client.requestDeposit(depositConfig);
```
- **checkDepositStatus(depositId, options?)**: Get status of a deposit.
```typescript
const statusResponse = await client.checkDepositStatus("DEPOSIT_ID_UUID");
```
- **resendDepositCallback(depositId, options?)**: Resend deposit callback.
```typescript
const resendResponse = await client.resendDepositCallback("DEPOSIT_ID_UUID");
```

### Payouts
- **requestPayout(data, options?)**: Initiate a payout.
```typescript
import { v4 as uuidv4 } from 'uuid';
import type { RequestPayoutConfig_v2 } from "pawapay-sdk";

const payoutConfig: RequestPayoutConfig_v2 = {
  payoutId: uuidv4(),
  amount: '50.00',
  currency: 'MWK',
  recipient: {
    type: "MMO",
    accountDetails: {
      phoneNumber: "265991234567",
      provider: "AIRTEL_MWI"
    }
  },
  customerMessage: 'Payout for service',
  clientReferenceId: 'REF-12345',
  metadata: []
};

const payoutResponse = await client.requestPayout(payoutConfig);
```
- **checkPayoutStatus(payoutId, options?)**: Get payout status.
```typescript
const payoutStatus = await client.checkPayoutStatus(payoutConfig.payoutId);
```
- **resendPayoutCallback(payoutId, options?)**: Resend payout callback.
```typescript
const resendPayout = await client.resendPayoutCallback(payoutConfig.payoutId);
```
- **cancelEnqueuedPayout(payoutId, options?)**: Cancel an enqueued payout.
```typescript
const cancelResponse = await client.cancelEnqueuedPayout(payoutConfig.payoutId);
```
- **initiateBulkPayout(data[], options?)**: Send multiple payouts in bulk.
```typescript
// Takes an array of RequestPayoutConfig_v2
const bulkPayouts = [payoutConfig, { ...payoutConfig, payoutId: uuidv4() }];
const bulkResponse = await client.initiateBulkPayout(bulkPayouts);
```

### Refunds
- **initiateRefund(data, options?)**: Request a refund.
```typescript
import { v4 as uuidv4 } from 'uuid';
import type { RequestRefundConfig_v2 } from "pawapay-sdk";

const refundConfig: RequestRefundConfig_v2 = {
  refundId: uuidv4(),
  depositId: "ORIGINAL_DEPOSIT_ID",
  amount: '100.00',
  currency: 'MWK',
  clientReferenceId: 'REF-REFUND-001',
  metadata: [{ fieldName: 'reason', fieldValue: 'Customer request' }]
};

const refundResponse = await client.initiateRefund(refundConfig);
```
- **checkRefundStatus(refundId, options?)**: Get refund status.
```typescript
const refundStatus = await client.checkRefundStatus("REFUND_ID_UUID");
```
- **resendRefundCallback(refundId, options?)**: Resend refund callback.
```typescript
const resendRefund = await client.resendRefundCallback("REFUND_ID_UUID");
```

### Remittances
- **initiateRemittance(data, options?)**: Initiate a cross-border remittance.
```typescript
import type { InitiateRemittanceConfig } from "pawapay-sdk";
// See type definition for full structure of recipient and sender objects
const remittanceConfig: InitiateRemittanceConfig = {
  remittanceId: uuidv4(),
  amount: "500.00",
  currency: "ZMW",
  recipient: { /* ... */ },
  sender: { /* ... */ },
  customerMessage: "Family Support",
  metadata: []
};
const response = await client.initiateRemittance(remittanceConfig);
```
- **checkRemittanceStatus(remittanceId, options?)**
- **resendRemittanceCallback(remittanceId, options?)**
- **cancelEnqueuedRemittance(remittanceId, options?)**

### Payment Pages
- **requestPayPage(data, options?)**: Create a hosted payment page session.
```typescript
import type { RequestPayPageConfig_v2 } from "pawapay-sdk";

const payPageConfig: RequestPayPageConfig_v2 = {
  depositId: uuidv4(),
  returnUrl: 'https://merchant.com/paymentProcessed',
  customerMessage: 'Ticket purchase',
  amountDetails: {
    amount: '20.00',
    currency: 'MWK'
  },
  phoneNumber: '265991234567',
  language: 'EN',
  country: 'MWI',
  reason: 'Event ticket',
  metadata: [{ fieldName: 'eventId', fieldValue: 'E123' }]
};
const payPageResponse = await client.requestPayPage(payPageConfig);
```

### Statements
- **requestStatement(data, options?)**: Request a financial statement.
```typescript
const statementReq = {
    wallet: { country: "MWI", currency: "MWK", provider: "AIRTEL_MWI" },
    callbackUrl: "https://your-callback.url",
    startDate: "2023-01-01",
    endDate: "2023-01-31",
    compressed: false
};
const response = await client.requestStatement(statementReq);
```
- **getStatementStatus(statementId, options?)**: Check generation status.

### Wallets
- **getWalletBalances(options?)**: Get all wallet balances.
```typescript
const walletBalances = await client.getWalletBalances({});
```

### Toolkit
- **getActiveConfiguration(options?)**: Get merchant configuration.
```typescript
const config = await client.getActiveConfiguration({});
```
- **getProviderAvailability(options?)**: List available providers and their status.
```typescript
const providers = await client.getProviderAvailability({});
```
- **getProviderPrediction(phoneNumber, options?)**: Predict the provider for a phone number.
```typescript
const prediction = await client.getProviderPrediction('265991234567');
```
- **getPublicKeys(options?)**: Retrieve public keys for callback signature verification.
```typescript
const publicKeys = await client.getPublicKeys({});
```

## Error Handling
All methods return a `PawaPayResponse<T, E>` object:
```typescript
const response = await client.requestDeposit(depositConfig);
if (response.success) {
  // Access response.data
  console.log('Success:', response.data);
} else {
  // Access response.error and response.status
  console.error('Error:', response.error, 'Status:', response.status);
}
```

## Types

The following TypeScript types are exported by the `pawapay-sdk` package:

- `DepositConfig_v2`, `DepositResponse_v2`, `DepositStatusResponse_v2`
- `RequestPayoutConfig_v2`, `RequestPayoutResponse_v2`
- `RequestRefundConfig_v2`, `RequestRefundResponse_v2`
- `InitiateRemittanceConfig`, `InitiateRemittanceResponse`
- `RequestPayPageConfig_v2`
- `RequestStatementConfig`, `RequestStatementResponse_v2`
- `WalletBalance_v2`
- `ProviderAvailability_v2`
- `ProviderPrediction_v2`
- `PawaPayResponse`, `PawaPayError`

**Example:**

```typescript
import { DepositConfig_v2, PawaPayResponse, PawaPayError } from "pawapay-sdk";
```

## Environments
- `sandbox`: For testing and development
- `live`: For production use

## Connect
- [Twitter](https://x.com/jonacempelule_)
- [LinkedIn](https://linkedin.com/in/jonacempelule)
- [GitHub](https://github.com/jonace-mpelule)

## License
MIT