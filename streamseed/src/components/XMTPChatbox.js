import React from "react";

import { Box } from "@chakra-ui/react";

import { Client } from '@xmtp/xmtp-js'

import { useSigner } from 'wagmi'

import { ethers } from "ethers";

class XMTPChatbox extends React.Component {
    // Wallet Address - 0x6C3ea836d6245fe6449E79c78736496bF3E7f2A5
    // Wallet Priv Key - 0x64e78563846075f6ae7afb1ae74ecc0599b4e7499ee5cbbbf59cca96e87d2c42
    // Wallet Pub Key - 0x048ebe16fae571f97a2a212f0ce00d539b54b95f511067fa2a957c1401b1c97070ed186b2ad08db5b7e352b470da29823515385db64ba1bf43b4ac8d8f20efb1af

    state = {
        
    }

    async componentDidMount() {
        window.Buffer = window.Buffer || require("buffer").Buffer; // Init Buffer as React Scripts >=5.0.0 removes it

        const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();

        const xmtp = await Client.create(signer);

        const conversation = await xmtp.conversations.newConversation('0x6C3ea836d6245fe6449E79c78736496bF3E7f2A5');

        const messages = await conversation.messages()

        await conversation.send('gm')

        console.log(await conversation.messages())
        
        for await (const message of await conversation.streamMessages()) {
            console.log(`[${message.senderAddress}]: ${message.content}`)
         }
    }

    componentWillUnmount() {

    }

    render() {
        return(
            <Box>
                Hi XMTP
            </Box>
        )
    }
}

export default XMTPChatbox;