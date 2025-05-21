import { PawaPayClient } from "./client";
import { DepositConfig } from "./types"

const apiKey = ""

const pawaPayClient = new PawaPayClient(apiKey, {
    environment: "live"
})

async function trial() {
    // Make Deposit
    const depositConfig: DepositConfig = {
        depositId: "",
        amount: "100",
        correspondent: "AIRTEL_MWI",
        currency: "MWK",
        customerTimestamp: "",
        payer: {
            type: "MSISDN",
            address: {
                value: "265999123678"
            }
        },
        statementDescription: ""
    }


    const depositResult = await pawaPayClient.requestDeposit(depositConfig)

    if (depositResult.success) {
        var depositData = depositResult.data
        if (depositData?.status == "REJECTED") {
            depositData.rejectionReason.rejectionMessage
        }

        if (depositData?.status == "DUPLICATE_IGNORED") {
            depositData.depositId
        }

        if (depositData?.status == "ACCEPTED") {
            depositData.depositId
        }
    } else {
        const error = depositResult.error!
        console.log(error.errorMessage)
    }



    //

    const resendRefundCb = await pawaPayClient.resendRefundCallback("MYREFUNDID")
    if (resendRefundCb.success) {
        var resendCBData = resendRefundCb.data

        if (resendCBData?.status == "REJECTED") {
            resendCBData.rejectionReason
        }
    }





}



