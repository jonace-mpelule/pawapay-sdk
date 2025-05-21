"use strict";
// import { PawaPayClient } from "./client"
// import { DepositConfig, PawaPayError, RequestPayPageConfig, RequestRefundConfig } from "./types"
// var depositData: DepositConfig = {
//     depositId: "",
//     amount: "",
//     currency: "",
//     correspondent: "",
//     payer: {
//         type: "MSISDN",
//         address: {
//             value: ""
//         }
//     },
//     customerTimestamp: "",
//     statementDescription: "",
//     metadata: []
// }
// const pawaPayClient = new PawaPayClient("MY_API_KEY")
// var result = await pawaPayClient.requestDeposit(depositData)
// if (result.success) {
//     var data = result.data
//     if (data?.status == "ACCEPTED") {
//         data.depositId
//         data.status
//         data.created
//     }
//     if (data?.status == "REJECTED") {
//         data.depositId
//         data.rejectionReason
//         data.rejectionReason.rejectionCode
//         data.rejectionReason.rejectionMessage
//         data.status
//         var code = data.rejectionReason.rejectionCode
//     }
//     if (data?.status == "DUPLICATE_IGNORED") {
//     }
// } else {
//     var error = result.error
//     error?.errorId
//     error?.errorCode
//     error?.errorMessage
// }
// var status = await pawaPayClient.checkDepositStatus("DEPOSIT_ID")
// if (status.success) {
//     var statusData = status.data
//     if (statusData?.status == "FAILED") {
//         statusData.failureReason.failureCode
//         statusData.requestedAmout
//     }
// }
// var resend = await pawaPayClient.resendDepositCallback("MY_DEPOSIT_ID")
// if (status.status) {
//     var d = resend.data
//     if (d?.status == "ACCEPTED") {
//         d.status
//     }
//     if (d?.status == "REJECTED") {
//         d.rejectionReason
//     }
// }
// var balaces = await pawaPayClient.checkWalletBalancesByCountry("MWI")
// if (balaces.success) {
//     var balanceData = balaces.data!
//     var currency = balanceData[0].currency
//     var balanceAmount = balanceData[0].balance
// }
// var getPublic = await pawaPayClient.getPublicKey()
// if (getPublic.success) {
//     var publicKeys = getPublic.data!
//     var firstKey = publicKeys[0]
//     firstKey.key
// }
// var getAvailableCorres = await pawaPayClient.getAvailableCorrespondent()
// if (getAvailableCorres.success) {
//     var gA = getAvailableCorres.data!
//     var mno = gA[0].correspondents[0].correspondent
// }
// var predictResponse = await pawaPayClient.predictCorrespondent("265998435576")
// if (predictResponse.success) {
//     var pR = predictResponse.data!
//     pR.correspondent
// } else {
//     const error = predictResponse.error!
//     error.errorCode
// }
// async function func() {
//     var config: RequestPayPageConfig = {
//         depositId: "", 
//         msisdn: "", 
//         returnUrl: "", 
//         amount: "", 
//         metadata: []
//     }
//     var payPageResponse = await pawaPayClient.requestPaymentPage(config)
//     if (payPageResponse.success) {
//         var data = payPageResponse.data
//         // redirectTo
//         data?.redirectUrl
//     }
//     // refunds
//     var refundConfig : RequestRefundConfig = {
//         depositId: "",
//         refundId: "",
//         amount: "",
//         metadata: [
//             {
//                 fieldName: "", 
//                 fieldValue: "",
//             }
//         ] 
//     }
//     var requestRefund = await pawaPayClient.requestRefund({refundConfig, options: {headers: {}, timeout: 30}})
//     if(requestRefund.success){
//         var refundData = requestRefund.data!
//         if(refundData.status == "REJECTED") {
//             refundData.rejectionReason.rejectionCode
//         }
//     }
// }
