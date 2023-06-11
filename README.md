<p align="center">
# Multibase JS SDK (@multibase/js)
&nbsp;
&nbsp;
<img src="https://cdn.multibase.co/shared/github/icon.png" alt="Multibase logo" width=150 />
&nbsp;
&nbsp;

Multibase JS is the first JavaScript SDK for merging your user off-chain, product interactions with on-chain transactions and activity.
</p>

### Table of contents
 - [✅ Getting started](#started)
 - [💻 Usage](#usage)
 - [⛓️ Supported chains](#chains) 
 - [❓ Feedback and Support](#support)
## [✅ Installation](#started)
#### Get a Multibase account
To use the Multibase JS SDK, the first thing you have to do is [sign up for a Mutlibase account](https://multibase.co?request=true). Go to the homepage and fill out our form, and we will get back to you ASAP to get you set up.
#### Install the Node Package
When you have your account, you're ready to go! To get started with using Multibase JS, you'll need to install the package to your project with NPM/yarn.

```
// npm
npm install @multibase/js

// yarn
yarn add @multibase/js
```

## [💻 Usage](#usage)
### Initialize the SDK
Multibase JS must be initialized before you can call any function. You will need your Multibase project's write API key.
```
import { init } from "@multibase/js"

init(YOUR_WRITE_API_KEY)
```
### Identify users
To associate product events with users, you have to use the `identify` function. You can identify a user by wallet address and chain, custom ID string, or both.
#### Identify by wallet and chain
To connect a user by their on-chain address, we must provide an `address` and `chain` parameter. For the `chain` parameter, view our [supported chains](#chains). 

When you identify user by wallet address and chain, they will automatically be synchronized in your Multibase workspace.
```
import { identify } from "@multibase/js"

// Basic identifying call
identify({
	type: "address",
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chain: 1
})

// Identify with properties
const userProperties = {
	"plan": "Premium User",
    "email": "vitalik@ethereum.org"
}
identify({
    type: "address",
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    chain: 1,
    properties: userProperties
})
```
#### Identify by custom user ID
You may want to choose to identify a user by a unique ID that is connected to your database. This can be used at the same time with an on-chain identifier.
```
// Basic identifying call
identify({
	type: "custom",
    id: "user_123"
})

// Identify with properties
const userProperties = {
	"plan": "Premium User",
    "email": "vitalik@ethereum.org"
}
identify({
	type: "custom",
    id: "user_123",
    properties: userProperties
})
```
### Track events
Tracking product events from your users is the key to understanding product usage over time, and understanding how off-chain activity converts to on-chain transactions. You can track and event with a custom string, or you can track properties along with the string.

In your Multibase dashboard, these events will appear alongside on-chain events.
```
import { track } from "@multibase/js"

// Basic tracking call
track("Link Click")

// Track with event properties
const eventProperties = {
	"type": "Call to Action",
    "timeToClick": 10
}
track("Link Click", eventProperties)
```
## [Supported chains](#chains)
| Chain|ID|
|--|--|
|Ethereum|1|
|Polygon|137|
|Arbitrum|42161|
|Avalanche|43114|
|BSC|250|
|Fantom|56|
## [❓ Feedback and Support](#support)
If you are having trouble setting up the Multibase SDK at all, please reach out to us for help. Here are some helpful links:

 - [Live Intercom support on our homepage](https://www.multibase.co)
 - [Add an issue on GitHub](https://github.com/multibaseco/js/issues/new/choose)
 - [Email us directly](mailto:support@multibase.co)