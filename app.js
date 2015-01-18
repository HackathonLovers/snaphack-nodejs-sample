var request = require('request');

var baseUrl = "https://api.cipcert.goevo.com/REST/2.0.22"

var identityToken = "PHNhbWw6QXNzZXJ0aW9uIE1ham9yVmVyc2lvbj0iMSIgTWlub3JWZXJzaW9uPSIxIiBBc3NlcnRpb25JRD0iXzdmMjUzNjUxLTM4YTMtNDRjNS04Y2U1LWM2NjlmZWRlMDA0ZCIgSXNzdWVyPSJJcGNBdXRoZW50aWNhdGlvbiIgSXNzdWVJbnN0YW50PSIyMDE1LTAxLTE1VDA2OjA5OjM5LjE1NVoiIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjEuMDphc3NlcnRpb24iPjxzYW1sOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDE1LTAxLTE1VDA2OjA5OjM5LjE1NVoiIE5vdE9uT3JBZnRlcj0iMjAxOC0wMS0xNVQwNjowOTozOS4xNTVaIj48L3NhbWw6Q29uZGl0aW9ucz48c2FtbDpBZHZpY2U+PC9zYW1sOkFkdmljZT48c2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PHNhbWw6U3ViamVjdD48c2FtbDpOYW1lSWRlbnRpZmllcj5BQTZGQzY5QzRERjAwMDAxPC9zYW1sOk5hbWVJZGVudGlmaWVyPjwvc2FtbDpTdWJqZWN0PjxzYW1sOkF0dHJpYnV0ZSBBdHRyaWJ1dGVOYW1lPSJTQUsiIEF0dHJpYnV0ZU5hbWVzcGFjZT0iaHR0cDovL3NjaGVtYXMuaXBjb21tZXJjZS5jb20vSWRlbnRpdHkiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlPkFBNkZDNjlDNERGMDAwMDE8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgQXR0cmlidXRlTmFtZT0iU2VyaWFsIiBBdHRyaWJ1dGVOYW1lc3BhY2U9Imh0dHA6Ly9zY2hlbWFzLmlwY29tbWVyY2UuY29tL0lkZW50aXR5Ij48c2FtbDpBdHRyaWJ1dGVWYWx1ZT40MmU0ZGY1Mi05M2E4LTQ4NzMtODZkZC1hODkyZjdjOTQxYjQ8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgQXR0cmlidXRlTmFtZT0ibmFtZSIgQXR0cmlidXRlTmFtZXNwYWNlPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcyI+PHNhbWw6QXR0cmlidXRlVmFsdWU+QUE2RkM2OUM0REYwMDAwMTwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjwvc2FtbDpBdHRyaWJ1dGVTdGF0ZW1lbnQ+PFNpZ25hdHVyZSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnIyI+PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiPjwvQ2Fub25pY2FsaXphdGlvbk1ldGhvZD48U2lnbmF0dXJlTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3JzYS1zaGExIj48L1NpZ25hdHVyZU1ldGhvZD48UmVmZXJlbmNlIFVSST0iI183ZjI1MzY1MS0zOGEzLTQ0YzUtOGNlNS1jNjY5ZmVkZTAwNGQiPjxUcmFuc2Zvcm1zPjxUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjZW52ZWxvcGVkLXNpZ25hdHVyZSI+PC9UcmFuc2Zvcm0+PFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyI+PC9UcmFuc2Zvcm0+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSI+PC9EaWdlc3RNZXRob2Q+PERpZ2VzdFZhbHVlPkEzRkplMUF1NnhVdHdIRkJaOXdBL3lDVWdNbz08L0RpZ2VzdFZhbHVlPjwvUmVmZXJlbmNlPjwvU2lnbmVkSW5mbz48U2lnbmF0dXJlVmFsdWU+UkVScXhsZTEvRjlGTVNlNldqQW9iT1k4RllQaURmOUErZkwrak52Mk1BWXUralhQNW9aVjZ4dnUwbGJhSDdLVkhpVGd5dFNXTWVadDI1VHByOHRWL0Fka1JsVk5QTkYwb01xMENQNTQyelp0QS94UW91cVBDR2ZoeXl5b0Z2OHcxb3lhRGdZdG10R0hPejFoN3E5MUlBUUszSHFkSm1WUitWNHNqZEV4ODFHUEw1NWtVdWdFcEJXcHgvTE1NQStLWFFEeWNqR2ExQXdFZTJza2VjSFJlWWQ4dU1pKzRNcUM2N25LMDVlZG5SaVV3WThhUnZ3Z1d3WlkrOVdlYUF0U0xzRE84ODVPc3Y4NGtPWkN3TDZmbTFlYUtKdUlCZUNYL1AxZXZUQlFuWEZYbDA3OVNEbHU5akJ2dFJma2N3MTNuZzA4ajNtMTVRMXM0Tnk4ZG1PWGJ3PT08L1NpZ25hdHVyZVZhbHVlPjxLZXlJbmZvPjxvOlNlY3VyaXR5VG9rZW5SZWZlcmVuY2UgeG1sbnM6bz0iaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcvd3NzLzIwMDQvMDEvb2FzaXMtMjAwNDAxLXdzcy13c3NlY3VyaXR5LXNlY2V4dC0xLjAueHNkIj48bzpLZXlJZGVudGlmaWVyIFZhbHVlVHlwZT0iaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcvd3NzL29hc2lzLXdzcy1zb2FwLW1lc3NhZ2Utc2VjdXJpdHktMS4xI1RodW1icHJpbnRTSEExIj5iQkcwU0cvd2RCNWJ4eVpyYjEvbTVLakhLMU09PC9vOktleUlkZW50aWZpZXI+PC9vOlNlY3VyaXR5VG9rZW5SZWZlcmVuY2U+PC9LZXlJbmZvPjwvU2lnbmF0dXJlPjwvc2FtbDpBc3NlcnRpb24+";

var sessionToken = "not defined yet";

var paymentTransactionData = {
    "$type": "AuthorizeAndCaptureTransaction,http://schemas.evosnap.com/CWS/v2.0/Transactions/Rest",
    "Transaction": {
        "$type": "BankcardTransactionPro,http://schemas.evosnap.com/CWS/v2.0/Transactions/Bankcard/Pro",
        "TenderData": {
            "CardData": {
                "CardType": "MasterCard",
                "CardholderName": "John Doe",
                "PAN": "5454545454545454",
                "Expire": "1215"
            },
            "CardSecurityData": {
                "InternationalAVSData": {
                    "HouseNumber": "123",
                    "Street": "Fake St",
                    "City": "Denver",
                    "StateProvince": "CO",
                    "PostalCode": "80202",
                    "Country": "USA"
                },
                "InternationalAVSOverride": {
                    "SkipAVS": true
                },
                "CVDataProvided": "Provided",
                "CVData": "111"
            }
        },
        "TransactionData": {
            "$type": "BankcardTransactionDataPro,http://schemas.evosnap.com/CWS/v2.0/Transactions/Bankcard/Pro",
            "CustomerPresent": "Ecommerce",
            "EntryMode": "Keyed",
            "GoodsType": "DigitalGoods",
            "OrderNumber": "1234",
            "SignatureCaptured": false,
            "Amount": "10.00",
            "CurrencyCode": "EUR",
            "TransactionDateTime": "2015-01-15T22:41:11.478-07:00",
            "PartialApprovalCapable": "NotSet",
            "TransactionCode": "NotSet",
            "Is3DSecure": false,
            "CardholderAuthenticationEntity": "NotSet",
            "CardPresence": false
        }
    },
    "ApplicationProfileId": "72446",
    "MerchantProfileId": "SNAP_00001"
};


var printTruncated = function(longText) {
    
    var delta = 40;
    return longText.substring(0, delta)+"..."+longText.substring(longText.length-delta, longText.length);
}

var base64encoded = function(asciiText) {
    
    var buffer = new Buffer(asciiText);
    var base64encodedData = buffer.toString('base64');

    return base64encodedData;
}

var paymentTransactionRequest = function() {

    console.log("");
    console.log("------------------------------------------------------");
    console.log("---------- INIT PAYMENT TRANSACTION REQUEST ----------");
    console.log("------------------------------------------------------");
    console.log("");
    
    var url = baseUrl + "/Txn/DF83D00001";
    var sessionToken64encoded = base64encoded(sessionToken+":");
    
    var options = {
        method: "POST",
        url: url,
        rejectUnauthorized: false,
        headers: {
            "Content-Type":  "application/json",
            "Authorization": "Basic "+sessionToken64encoded
        },
        json: paymentTransactionData
    };
    
    console.log("sessionToken64encoded  -> "+printTruncated(sessionToken64encoded));
    
    console.log("");
    console.log("payment transaction data");
    console.log("------------------------");
    console.log(paymentTransactionData);
    
    console.log("");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("POST                   -> "+url)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("");
    
    request(options, function(error, response, body) {
        
        console.log("result of payment transaction request");
        console.log("-------------------------------------");
        console.log(body);
    });
}

var autenticationRequest = function() {

    console.log("");
    console.log("------------------------------------------------------");
    console.log("------------- INIT AUTENTICATION REQUEST -------------");
    console.log("------------------------------------------------------");
    console.log("");
    
    var url = baseUrl + "/SvcInfo/token";
    var identityToken64encoded = base64encoded(identityToken+":");
    
    var options = {
        method: "GET",
        url: url,
        rejectUnauthorized: false,
        headers: {
            "Content-Type":  "application/json",
            "Authorization": "Basic "+identityToken64encoded
        }
    };
    
    console.log("identityToken          -> "+printTruncated(identityToken));
    console.log("identityToken64encoded -> "+printTruncated(identityToken64encoded));
    
    console.log("");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("GET                    -> "+url)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("");
    
    request(options, function(error, response, body) {
        
        sessionToken = body.substring(1, body.length-1);
        
        console.log("body                   -> "+printTruncated(body));
        console.log("sessionToken           -> "+printTruncated(sessionToken));
        
        paymentTransactionRequest();
    });
}

autenticationRequest();