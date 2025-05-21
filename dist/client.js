"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PawaPayClient = void 0;
const axios_1 = __importDefault(require("axios"));
class PawaPayClient {
    constructor(apiKey, baseUrl = 'https://api.pawapay.com/v1') {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.apiClient = axios_1.default.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        });
    }
    request(config, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield this.apiClient.request(config);
                return {
                    success: true,
                    data: response.data,
                    status: response.status,
                    headers: response.headers
                };
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    return {
                        success: false,
                        error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message,
                        status: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || 500
                    };
                }
                return {
                    success: false,
                    error: {
                        errorMessage: 'Unknown error occurred'
                    },
                    status: 500
                };
            }
        });
    }
    requestDeposit(data_1) {
        return __awaiter(this, arguments, void 0, function* (data, { options } = {}) {
            return this.request({
                method: 'POST',
                url: '/deposits',
                data,
            }, options);
        });
    }
    checkDepositStatus(depositId_1) {
        return __awaiter(this, arguments, void 0, function* (depositId, { options } = {}) {
            return this.request({
                method: 'GET',
                url: `/deposits/${depositId}`
            }, options);
        });
    }
    resendDepositCallback(depositId_1) {
        return __awaiter(this, arguments, void 0, function* (depositId, { options } = {}) {
            var data = { depositId };
            return this.request({
                method: 'POST',
                url: '/deposits/resend-callback',
                data,
            }, options);
        });
    }
    // --- REFUND
    requestRefund(refundConfig_1) {
        return __awaiter(this, arguments, void 0, function* (refundConfig, { options } = {}) {
            return this.request({
                method: "POST",
                url: '/refunds',
                data: refundConfig
            }, options);
        });
    }
    checkRefundStatus(refundId_1) {
        return __awaiter(this, arguments, void 0, function* (refundId, { options } = {}) {
            return this.request({
                method: 'GET',
                url: `/refunds/${refundId}`
            }, options);
        });
    }
    resendRefundCallback(refundId_1) {
        return __awaiter(this, arguments, void 0, function* (refundId, { options } = {}) {
            return this.request({
                method: 'POST',
                url: '/refund/resend-callback',
                data: { refundId }
            }, options);
        });
    }
    // --- PAYMENT PAGE
    requestPaymentPage(payload_1) {
        return __awaiter(this, arguments, void 0, function* (payload, { options } = {}) {
            return this.request({
                method: 'POST',
                url: '/v1/widget/sessions',
                data: payload
            });
        });
    }
    // --- WALLETS
    checkWalletBalances() {
        return __awaiter(this, arguments, void 0, function* ({ options } = {}) {
            return this.request({
                method: 'GET',
                url: '/v1/wallet-balances'
            }, options);
        });
    }
    checkWalletBalancesByCountry(country_1) {
        return __awaiter(this, arguments, void 0, function* (country, { options } = {}) {
            return this.request({
                method: 'GET',
                url: `/v1/wallet-balances/${country}`
            });
        });
    }
    // --- TOOLKIT
    getActiveConfiguration() {
        return __awaiter(this, arguments, void 0, function* ({ options } = {}) {
            return this.request({
                method: `GET`,
                url: `/active-conf`
            }, options);
        });
    }
    getAvailableCorrespondent() {
        return __awaiter(this, arguments, void 0, function* ({ options } = {}) {
            return this.request({
                method: 'GET',
                url: '/availability'
            }, options);
        });
    }
    predictCorrespondent(msisdn_1) {
        return __awaiter(this, arguments, void 0, function* (msisdn, { options } = {}) {
            var data = { msisdn };
            return this.request({
                method: 'GET',
                url: '/v1/predict-correspondent',
                data
            }, options);
        });
    }
    getPublicKey({ options } = {}) {
        return this.request({
            method: 'GET',
            url: '/public-key/https'
        }, options);
    }
}
exports.PawaPayClient = PawaPayClient;
