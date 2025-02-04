# Changelog


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

