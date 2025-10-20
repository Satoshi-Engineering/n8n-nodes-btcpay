# Changelog


## v0.1.12

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.11...v0.1.12)

### 🏡 Chore

- Pnpm audit ([d6d7a6c](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d6d7a6c))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.11

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.10...v0.1.11)

### 🏡 Chore

- Audit fix ([caf985a](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/caf985a))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.10

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.9...v0.1.10)

### 💅 Refactors

- Add hint to store selection if none is selected ([428b2f5](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/428b2f5))

### 📖 Documentation

- Add hint to additional fields for payment request creation ([517667d](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/517667d))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.9

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.8...v0.1.9)

### 🚀 Enhancements

- Trigger node accept test data from btcpay when testing a paymentRequestCompleted webhook using PaymentStatusChanged event in btcpay ([1109857](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/1109857))

### 💅 Refactors

- Clean code action node a bit ([b9ea3ae](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/b9ea3ae))
- Clean code trigger node + fix action node refactoring ([4ca41f5](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/4ca41f5))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.8

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.7...v0.1.8)

### 📖 Documentation

- Add package name to README ([65b58a0](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/65b58a0))
- Add more explanation to the trigger node ([0a2013c](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/0a2013c))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.7

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.6...v0.1.7)

### 🩹 Fixes

- ApiRequest helper function handle trailing slash in credentials host ([46f548b](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/46f548b))

### 📖 Documentation

- **release:** Add release guide ([dcf4ef3](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/dcf4ef3))
- Readme ([a387f3a](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/a387f3a))

### ✅ Tests

- Add more tests for BtcPayTrigger node ([19d40a8](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/19d40a8))
- Add tests for BtcPay action node ([d2bd074](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d2bd074))

### ❤️ Contributors

- Thomas Schagerl <tom@satoshiengineering.com>
- Thespielplatz <informatics@gmx.net>

## v0.1.6

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.5...v0.1.6)

### 🩹 Fixes

- **pipeline:** Remove script publish due double call in the github action and move parameters to pipeline script ([10494b5](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/10494b5))

### ✅ Tests

- Add more tests for BtcPayTrigger node ([0e26880](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/0e26880))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>
- Thomas Schagerl <tom@satoshiengineering.com>

## v0.1.5

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.4...v0.1.5)

### 🩹 Fixes

- **pipeline:** Disable git-checks false due bug in pnpm run publish ([3210195](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/3210195))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>

## v0.1.4

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.3...v0.1.4)

### 🩹 Fixes

- **pipeline:** Add git checkout step due bug in pnpm run publish ([5c571f7](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/5c571f7))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>

## v0.1.3

[compare changes](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/compare/v0.1.2...v0.1.3)

### 🩹 Fixes

- **pipeline:** Use pnpm i i/o pnpm ci (The ci command is not implemented yet) ([2f91ccb](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/2f91ccb))
- **pipeline:** Use pnpm i/o npm in bump version script ([7f50b3f](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/7f50b3f))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>

## v0.1.2


### 🚀 Enhancements

- Add btc displayname and logo to example node ([97c31b5](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/97c31b5))
- Add first properties to btcpay node ([33f6bcb](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/33f6bcb))
- Add title and additional fields to btcpay node ([2d5e44d](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/2d5e44d))
- Implement payment request creation ([b8fc1fd](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/b8fc1fd))
- Add credentials for btcpay server apitoken ([8e9c001](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/8e9c001))
- Add storeId selection to btcpay node ([ce8d4c8](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/ce8d4c8))
- Add BtcPayTrigger node, still work in progress ([47b6a1b](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/47b6a1b))
- Add get payment request operation ([d93ec9f](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d93ec9f))

### 🩹 Fixes

- Allow zero additional fields ([79e1529](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/79e1529))
- Btcpay trigger creation ([279d5e4](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/279d5e4))
- Btcpay webhook trigger send undefined as data to stop execution i/o empty array ([c153807](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/c153807))
- Btcpay trigger node handle signature check ([d6e7be1](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d6e7be1))
- **pipeline:** Pipeline script ([5cbccd1](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/5cbccd1))

### 💅 Refactors

- Rename example node to btcpay node ([e1a1b31](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/e1a1b31))

### 🏡 Chore

- Add basic project info to package.json ([acac1e6](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/acac1e6))
- Change name in package.json to npm package name ([b6634af](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/b6634af))
- Publish tasks ([e115884](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/e115884))
- **release:** V0.1.1 ([c32cb93](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/c32cb93))

### ✅ Tests

- Add first unit test using jest ([659713f](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/659713f))

### 🤖 CI

- Add bump version script ([f98c3eb](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/f98c3eb))
- Add github pipeline that publishes a new github release to npm ([6702402](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/6702402))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>
- Thomas Schagerl <tom@satoshiengineering.com>
- Dr-erych <dave@satoshiengineering.com>

## v0.1.1


### 🚀 Enhancements

- Add btc displayname and logo to example node ([97c31b5](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/97c31b5))
- Add first properties to btcpay node ([33f6bcb](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/33f6bcb))
- Add title and additional fields to btcpay node ([2d5e44d](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/2d5e44d))
- Implement payment request creation ([b8fc1fd](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/b8fc1fd))
- Add credentials for btcpay server apitoken ([8e9c001](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/8e9c001))
- Add storeId selection to btcpay node ([ce8d4c8](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/ce8d4c8))
- Add BtcPayTrigger node, still work in progress ([47b6a1b](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/47b6a1b))
- Add get payment request operation ([d93ec9f](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d93ec9f))

### 🩹 Fixes

- Allow zero additional fields ([79e1529](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/79e1529))
- Btcpay trigger creation ([279d5e4](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/279d5e4))
- Btcpay webhook trigger send undefined as data to stop execution i/o empty array ([c153807](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/c153807))
- Btcpay trigger node handle signature check ([d6e7be1](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/d6e7be1))

### 💅 Refactors

- Rename example node to btcpay node ([e1a1b31](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/e1a1b31))

### 🏡 Chore

- Add basic project info to package.json ([acac1e6](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/acac1e6))
- Change name in package.json to npm package name ([b6634af](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/b6634af))
- Publish tasks ([e115884](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/e115884))

### 🤖 CI

- Add bump version script ([f98c3eb](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/f98c3eb))
- Add github pipeline that publishes a new github release to npm ([6702402](https://github.com/Satoshi-Engineering/n8n-nodes-btcpay/commit/6702402))

### ❤️ Contributors

- Thespielplatz <informatics@gmx.net>
- Thomas Schagerl <tom@satoshiengineering.com>
- Dr-erych <dave@satoshiengineering.com>

