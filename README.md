# Ejemplo de pago con tarjeta de crédito con la API de Snap*

A continuación quiero mostrar lo fácil que puede llegar a ser programar un pago con tarjeta de crédito con Snap*

# Autenticación

Lo primero que hay que hacer es una **petición REST con las credenciales de tu aplicación** para obtener un token de sesión.

Para ello hacemos un **GET** a https://api.cipcert.goevo.com/REST/2.0.22/SvcInfo/token añadiendo en la cabecera los siguientes parámetros:

| Headers parámeters |                                           |
|--------------------|-------------------------------------------|
| Content-Type       | "application/json"                        |
| Authorization      | "Basic "+base64encoded(identityToken+":") |

# Transacción

Lo segundo que hay que hacer es una **petición REST con el token de sesión recogido en el paso anterior y los datos de la compra** para realizar la transacción.

Para ello hacemos un **POST** a https://api.cipcert.goevo.com/REST/2.0.22/Txn/DF83D00001 añadiendo en la cabecera los siguientes parámetros:

| Headers parámeters |                                           |
|--------------------|-------------------------------------------|
| Content-Type       | "application/json"                        |
| Authorization      | "Basic "+base64encoded(sesionToken+":")   |

También tendremos que mandar en la petición **los datos del pago con un JSON** parecido a este:

~~~
{
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
}
~~~

# Ejemplo

Para ejecutar el ejemplo:

~~~
$ git clone git@github.com:HackathonLovers/snaphack-nodejs-sample.git
$ cd snaphack-nodejs-sample
$ npm install
$ node app.js
~~~

NOTA: Necesitas tener previamente instalado node (http://nodejs.org/)