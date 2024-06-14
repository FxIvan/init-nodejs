### Endpoint

> Method GET
> `{{host}}/api/exchange/binance`

> Ejemplo de response

```
{
    "success": true,
    "data": {
        "assets": [
            [
                {
                    "asset": "AMB",
                    "free": "0.417",
                    "locked": "0",
                    "freeze": "0",
                    "withdrawing": "0",
                    "ipoable": "0",
                    "btcValuation": "0"
                },
            ]
        ],
        "deposit": [
            [
                {
                    "id": "3977161527941218049",
                    "amount": "730",
                    "coin": "USDT",
                    "network": "BSC",
                    "status": 1,
                    "address": "0x86e47f3fda52fac6c8bf1a9a172abd135cd48589",
                    "addressTag": "",
                    "txId": "0x18f6f9110891855795abe0cec8a566687c8affcabd1ff0747a753765856ff686",
                    "insertTime": 1715015700000,
                    "transferType": 0,
                    "confirmTimes": "15/15",
                    "unlockConfirm": 0,
                    "walletType": 0
                },
            ]
        ],
        "withdraw": [
            [
                {
                    "id": "50b68826ff7d4da7b521457158ce03e1",
                    "amount": "14.67",
                    "transactionFee": "0.33",
                    "coin": "USDT",
                    "status": 6,
                    "address": "0x351F19391e54F9bcb125d05c82d1f9AEdFb0B138",
                    "txId": "0x4f0360298ae6bb186c85b5560cd9b5c081e0ac1ce39c7d86419ebcc1137d0b3f",
                    "applyTime": "2024-04-15 18:02:12",
                    "network": "BSC",
                    "transferType": 0,
                    "info": "0xe2fc31f816a9b94326492132018c3aecc4a93ae1,23847705",
                    "confirmNo": 20,
                    "walletType": 0,
                    "txKey": "",
                    "completeTime": "2024-04-15 18:03:42"
                },
                {
                    "id": "7d4cbfc07b5a41d184d95fcc0c747874",
                    "amount": "169.67",
                    "transactionFee": "0.33",
                    "coin": "USDT",
                    "status": 6,
                    "address": "0x351F19391e54F9bcb125d05c82d1f9AEdFb0B138",
                    "txId": "0xea45da457cfe6347d5a3341bffe5899709cacaca7bc63d6369376fe05a5f4058",
                    "applyTime": "2024-04-12 17:32:44",
                    "network": "BSC",
                    "transferType": 0,
                    "info": "0xe2fc31f816a9b94326492132018c3aecc4a93ae1,23768921",
                    "confirmNo": 20,
                    "walletType": 0,
                    "txKey": "",
                    "completeTime": "2024-04-12 17:34:43"
                },
                {
                    "id": "13f8a587187d433ab37eb0200eead7aa",
                    "amount": "39.6083944",
                    "transactionFee": "0.33",
                    "coin": "USDT",
                    "status": 6,
                    "address": "0x351F19391e54F9bcb125d05c82d1f9AEdFb0B138",
                    "txId": "0x4eaf4d4ee44b2de995ccc7bb9d0c7c25f94e93f5c4ec5fed33fec4ef2deb700d",
                    "applyTime": "2024-04-05 15:53:02",
                    "network": "BSC",
                    "transferType": 0,
                    "info": "0x8894e0a0c962cb723c1976a4421c95949be2d4e3,25041096",
                    "confirmNo": 20,
                    "walletType": 0,
                    "txKey": "",
                    "completeTime": "2024-04-05 15:54:43"
                },
                {
                    "id": "31abceed92684d0981c10c6216eea065",
                    "amount": "11.67",
                    "transactionFee": "0.33",
                    "coin": "USDT",
                    "status": 6,
                    "address": "0x351F19391e54F9bcb125d05c82d1f9AEdFb0B138",
                    "txId": "0x3d8ec8bc707e228f2249eb0b811edd126f120d00b38eab9a9fd56af788cc8d96",
                    "applyTime": "2024-04-03 00:20:18",
                    "network": "BSC",
                    "transferType": 0,
                    "info": "0xe2fc31f816a9b94326492132018c3aecc4a93ae1,23502803",
                    "confirmNo": 20,
                    "walletType": 0,
                    "txKey": "",
                    "completeTime": "2024-04-03 00:21:42"
                },
                {
                    "id": "df4baf0baaa7462c9e0cb7f7d33c3d15",
                    "amount": "49.67",
                    "transactionFee": "0.33",
                    "coin": "USDT",
                    "status": 6,
                    "address": "0x351F19391e54F9bcb125d05c82d1f9AEdFb0B138",
                    "txId": "0x534b7204b8d4f259e754ffbf09f4c84c9de1ab1cfc0e3e248dd96ee5f942836f",
                    "applyTime": "2024-03-31 18:09:25",
                    "network": "BSC",
                    "transferType": 0,
                    "info": "0xe2fc31f816a9b94326492132018c3aecc4a93ae1,23434744",
                    "confirmNo": 20,
                    "walletType": 0,
                    "txKey": "",
                    "completeTime": "2024-03-31 18:10:43"
                },

            ]
        ],
        "orders": [
            {
                "quoteId": "104fa332abbb40819e8c1c319b9c4b95",
                "orderId": 1747731576970023000,
                "orderStatus": "SUCCESS",
                "fromAsset": "USDT",
                "fromAmount": "1",
                "toAsset": "PEPE",
                "toAmount": "73203.09",
                "ratio": "73203.2267982",
                "inverseRatio": "0.0000136606000000",
                "createTime": 1718198734652,
                "orderType": "MARKET",
                "side": "BUY"
            },
            {
                "quoteId": "ceabd491bae24a64aaaa12989db0b4c1",
                "orderId": 1747732135315276300,
                "orderStatus": "SUCCESS",
                "fromAsset": "PEPE",
                "fromAmount": "73203",
                "toAsset": "USDT",
                "toAmount": "0.99092771",
                "ratio": "0.0000135367000000",
                "inverseRatio": "73873.2482806",
                "createTime": 1718198799236,
                "orderType": "MARKET",
                "side": "SELL"
            },

        ]
    }
}
```
