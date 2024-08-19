
<h1 align="center">Multibase JS SDK (@multibase/js)</h1>

&nbsp;
&nbsp;
<p align="center">
<img src="https://cdn.multibase.co/shared/github/icon.png" alt="Multibase logo" width=150 />
</p>
&nbsp;
&nbsp;

Multibase JS is the first JavaScript SDK for merging your user off-chain, product interactions with on-chain transactions and activity.

### Table of contents
 - [✅ Getting started](#-getting-started)
 - [💻 Usage](#-usage)
 - [❓ Feedback and Support](#-feedback-and-support)

## [✅ Getting started](#-started)
#### Get a Multibase account
To use the Multibase JS SDK, the first thing you have to do is [sign up for a Multibase account](https://multibase.co?request=true). Go to the homepage and fill out our form, and we will get back to you ASAP to get you set up.
#### Install the Node Package
When you have your account, you're ready to go! To get started with using Multibase JS, you'll need to install the package to your project with NPM/yarn.

```sh
# npm
npm install @multibase/js

# yarn
yarn add @multibase/js
```

## [💻 Usage](#-usage)
### Initialize the SDK
Multibase JS must be initialized before you can call any function. You will need your Multibase project's write API key.
```ts
import { init } from "@multibase/js"

init(YOUR_WRITE_API_KEY)
```
### Identify users
To associate product events with users, you have to use the `identify` function.
#### Identify by wallet
To connect a user by their on-chain address, we must provide an `address` parameter.

When you identify user by wallet address, they will automatically be synchronized in your Multibase workspace. Upon import, Multibase will sync all on-chain data on every chain where a user has sent at least one transaction.
```ts
import { identify } from "@multibase/js"

// Basic identifying call
identify("0xd8da6bf26964af9d7eed9e03e53415d37aa96045")

// Identify with properties
const userProperties = {
    plan: "Premium User",
    email: "vitalik@ethereum.org"
}
identify("0xd8da6bf26964af9d7eed9e03e53415d37aa96045", {
    plan: "Premium User",
    email: "vitalik@ethereum.org"
})
```

### Track events
Tracking product events from your users is the key to understanding product usage over time, and understanding how off-chain activity converts to on-chain transactions. You can track an event with a custom string, or you can track properties along with the string.

In your Multibase dashboard, these events will appear alongside on-chain events.
```ts
import { track } from "@multibase/js"

// Basic tracking call
track("Link Click")

// Track with event properties
track("Link Click", {
    type: "Call to Action",
    timeToClick: 10
})
```

## [❓ Feedback and Support](#-support)
If you are having trouble setting up the Multibase SDK at all, please reach out to us for help. Here are some helpful links:

 - [Check out our homepage](https://www.multibase.co)
 - [Add an issue on GitHub](https://github.com/multibaseco/js/issues/new/choose)
 - [Email us directly](mailto:support@multibase.co)
