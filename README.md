# n8n-nodes-btcpay

This is an n8n community node. It lets you use [BTCPay](https://btcpayserver.org/) in your n8n workflows.

BTCPay Server is a self-hosted, open-source bitcoin payment processor. It's secure, private, censorship-resistant and free.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Payment Requests

With this node, you can:

* **Create** new payment requests.
* **Check** the status of an existing payment request.
* **Trigger workflows** when a payment request is completed (i.e., when an invoice created by the request is settled).

## Credentials

To use this node, you need to generate API keys in your [BTCPay Account](https://mainnet.demo.btcpayserver.org/account/apikeys).

### Steps to Generate API Keys

1. Navigate to `/account/apikeys`.
2. Click **Generate Keys** and enter a label of your choice.
3. Assign the necessary permissions based on your use case:

    * **View stores** (`btcpay.store.canviewstoresettings`) → Required for all nodes.
    * **Modify store webhooks** (`btcpay.store.webhooks.canmodifywebhooks`) → Required for the trigger node.
    * **View payment requests** (`btcpay.store.canviewpaymentrequests`) → Needed for the get operation.
    * **Modify payment requests** (`btcpay.store.canmodifypaymentrequests`) → Needed for the create operation.

### Adding Credentials to n8n

1. Once your API key is generated, locate it in the table and click **Reveal** under the `Key` column.
2. Copy the API key and go to your n8n instance.
3. Navigate to `/home/credentials` and create new credentials for BTCPay.
4. Select BTCPay API, then:

    * Paste the API key in the **API Token** field.
    * Enter the host URL of your BTCPay server (including protocol and port).

## Compatibility

* Developed with **n8n version 1.51.0** and **BTCPay Server version 2.0.6**.
* Older versions may work but are not tested.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [BTCPay API docs](https://docs.btcpayserver.org/API/Greenfield/v1/)

## Contribute

For local development follow [this guide](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/) for setup.

Or use the following summary below:

Want to contribute? Follow the [official guide](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/) to set up your local development environment.

Alternatively, you can follow this quick setup guide:

```sh
# Install n8n globally
pnpm install n8n -g

# Clone the project and set up dependencies
cd ~/your/projects
git clone https://github.com/Satoshi-Engineering/n8n-nodes-btcpay
cd n8n-nodes-btcpay
pnpm i
pnpm build
pnpm link --global

# Start n8n to ensure the nodes directory is available
n8n start

# (Optional) If ~/.n8n/nodes is not available, open n8n in the browser and install any community module

# Link the custom node to n8n
cd ~/.n8n/nodes
pnpm link --global n8n-nodes-btcpay

# After making changes to the source code, rebuild and restart n8n
cd ~/your/projects/n8n-nodes-btcpay
pnpm build
n8n start
```

### Testing

All new nodes and operations should include full unit tests to ensure reliability.

Your contributions are greatly appreciated! 🚀

## Tip us

If you find this project useful and would like to support its development, why not [send some tip love?](https://satoshiengineering.com/tipjar/)
