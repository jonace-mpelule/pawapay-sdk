# PawaPay SDK for Node.js

<p align="center">
  <img src="https://camo.githubusercontent.com/d0a69e9f739056676aa125e5d8cf86d739719451e104bc215e4f38cc12ae4919/68747470733a2f2f676c6f62616c2d75706c6f6164732e776562666c6f772e636f6d2f3632383234353931303135616133313466643330386466312f3634313162323635393665336465336635323535316330305f4c6f676f706177617061792d702d3530302e706e67" alt="pawaPay Logo" width="220"/>
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

A comprehensive TypeScript/JavaScript SDK for integrating with the pawaPay API, enabling seamless mobile money operations such as deposits, payouts, refunds, wallet balance checks, and more.

## Features
- **Deposits**: Initiate, check status, and manage deposit transactions.
- **Payouts**: Send single or bulk payouts, check payout status, resend callbacks, and cancel enqueued payouts.
- **Refunds**: Request refunds, check refund status, and resend refund callbacks.
- **Wallets**: Retrieve wallet balances by country or overall.
- **Payment Pages**: Generate hosted payment pages for customer payments.
- **Toolkit**: Access configuration, available correspondents, correspondent prediction, and public keys.

## Installation
```bash
npm install pawapay-sdk
```

## Generating UUIDs for Transaction IDs
You can generate UUIDs for `depositId`, `payoutId`, and `refundId` using the [uuid](https://www.npmjs.com/package/uuid) package (version 4):

```bash
npm install uuid
```

```typescript
import { v4 as uuidv4 } from 'uuid';

const depositId = uuidv4();
const payoutId = uuidv4();
const refundId = uuidv4();
```

## Usage
```typescript
import { PawaPayClient } from './src/client';

const client = new PawaPayClient('YOUR_API_KEY', { environment: 'sandbox' });
```

## API Reference & Examples

### Deposits
- **requestDeposit(data, options?)**: Initiate a deposit.
```typescript
import { v4 as uuidv4 } from 'uuid';
const depositConfig = {
  depositId: uuidv4(),
  amount: '100.00',
  currency: 'MWK',
  country: 'MWI',
  correspondent: 'AIRTEL_MWI',
  payer: { type: 'MSISDN', address: { value: '265991234567' } },
  customerTimestamp: new Date().toISOString(),
  statementDescription: 'Payment for order 1234',
  metadata: [{ fieldName: 'orderId', fieldValue: '1234' }]
};
const depositResponse = await client.requestDeposit(depositConfig);
```
- **checkDepositStatus(depositId, options?)**: Get status of a deposit.
```typescript
const statusResponse = await client.checkDepositStatus(depositConfig.depositId);
```
- **resendDepositCallback(depositId, options?)**: Resend deposit callback.
```typescript
const resendResponse = await client.resendDepositCallback(depositConfig.depositId);
```

### Payouts
- **requestPayout(data, options?)**: Initiate a payout.
```typescript
import { v4 as uuidv4 } from 'uuid';
const payoutConfig = {
  payoutId: uuidv4(),
  amount: '50.00',
  currency: 'MWK',
  correspondent: 'AIRTEL_MWI',
  receipient: '265991234567',
  customerTimestamp: new Date().toISOString(),
  statementDescription: 'Payout for service',
  country: 'MWI',
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
- **requestBulkPayout(data[], options?)**: Send multiple payouts in bulk.
```typescript
const bulkPayouts = [payoutConfig, { ...payoutConfig, payoutId: uuidv4() }];
const bulkResponse = await client.requestBulkPayout(bulkPayouts);
```

### Refunds
- **requestRefund(refundConfig, options?)**: Request a refund.
```typescript
import { v4 as uuidv4 } from 'uuid';
const refundConfig = {
  refundId: uuidv4(),
  depositId: depositConfig.depositId,
  amount: '100.00',
  metadata: [{ fieldName: 'reason', fieldValue: 'Customer request' }]
};
const refundResponse = await client.requestRefund(refundConfig);
```
- **checkRefundStatus(refundId, options?)**: Get refund status.
```typescript
const refundStatus = await client.checkRefundStatus(refundConfig.refundId);
```
- **resendRefundCallback(refundId, options?)**: Resend refund callback.
```typescript
const resendRefund = await client.resendRefundCallback(refundConfig.refundId);
```

### Payment Pages
- **requestPaymentPage(payload, options?)**: Create a hosted payment page session.
```typescript
const payPageConfig = {
  depositId: uuidv4(),
  returnUrl: 'https://merchant.com/paymentProcessed',
  statementDescription: 'Ticket purchase',
  amount: '20.00',
  msisdn: '265991234567',
  language: 'EN',
  country: 'MWI',
  reason: 'Event ticket',
  metadata: [{ fieldName: 'eventId', fieldValue: 'E123' }]
};
const payPageResponse = await client.requestPaymentPage(payPageConfig);
```

### Wallets
- **checkWalletBalances(options?)**: Get all wallet balances.
```typescript
const walletBalances = await client.checkWalletBalances({});
```
- **checkWalletBalancesByCountry(country, options?)**: Get wallet balances for a specific country.
```typescript
const mwBalances = await client.checkWalletBalancesByCountry('MWI', {});
```

### Toolkit
- **getActiveConfiguration(options?)**: Get merchant configuration and supported correspondents.
```typescript
const config = await client.getActiveConfiguration({});
```
- **getAvailableCorrespondent(options?)**: List available correspondents and their operational status.
```typescript
const correspondents = await client.getAvailableCorrespondent({});
```
- **predictCorrespondent(msisdn, options?)**: Predict the correct correspondent for a phone number.
```typescript
const prediction = await client.predictCorrespondent('265991234567', {});
```
- **getPublicKey(options?)**: Retrieve public keys for callback signature verification.
```typescript
const publicKeys = await client.getPublicKey({});
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

## Environments
- `sandbox`: For testing and development
- `live`: For production use

## Connect
- [Twitter](https://x.com/jonacempelule_)
- [LinkedIn](https://linkedin.com/in/jonacempelule)
- [GitHub](https://github.com/jonace-mpelule)

## License
MIT