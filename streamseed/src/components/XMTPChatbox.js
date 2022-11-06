import React from 'react';

import { Box, Center, VStack } from '@chakra-ui/react';

import { Client } from '@xmtp/xmtp-js';

import { ethers, Wallet } from 'ethers';

import { Input } from '@chakra-ui/react';

class XMTPChatbox extends React.Component {
  // Wallet Address - 0x6C3ea836d6245fe6449E79c78736496bF3E7f2A5
  // Wallet Priv Key - 0x64e78563846075f6ae7afb1ae74ecc0599b4e7499ee5cbbbf59cca96e87d2c42
  // Wallet Pub Key - 0x048ebe16fae571f97a2a212f0ce00d539b54b95f511067fa2a957c1401b1c97070ed186b2ad08db5b7e352b470da29823515385db64ba1bf43b4ac8d8f20efb1af

  state = {
    userSigner: '',
    userXMTP: '',
    inboxXMTP: '',
    conversationWithInbox: '',
    messagesInInbox: '',
    value: ""
  };

  componentDidMount = async () => {
    window.Buffer = window.Buffer || require('buffer').Buffer; // Init Buffer as React Scripts >=5.0.0 removes it

    const userSigner = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();

    const inboxSigner = new Wallet(
      '0x64e78563846075f6ae7afb1ae74ecc0599b4e7499ee5cbbbf59cca96e87d2c42'
    );

    const userXMTP = await Client.create(userSigner);

    const inboxXMTP = await Client.create(inboxSigner);

    const conversationWithInbox = await userXMTP.conversations.newConversation(
      '0x6C3ea836d6245fe6449E79c78736496bF3E7f2A5'
    );

    this.setState(
      { userSigner, userXMTP, inboxXMTP, conversationWithInbox },
      () => {
        this.pullInboxMessages();
        this.interval = setInterval(() => this.pullInboxMessages(), 1000);
      }
    );
  };

  componentWillUnmount() {}

  async pullInboxMessages() {
    const { inboxXMTP } = this.state;
    /*
            const messages = await conversationWithInbox.messages()

            await conversationWithInbox.send('gm')

            console.log(await conversationWithInbox.messages())
        */

    let messages = [];

    const allConversations = await inboxXMTP.conversations.list();

    for (const convo of allConversations) {
      const msgs = await convo.messages();

      msgs.forEach((m) => messages.push(m));
    }

    messages = [...new Set(messages)]; // Duplicate remove

    // Sort messages by time in
    messages.sort((a, b) => a.sent.getTime() - b.sent.getTime());
    this.setState({ messagesInInbox: messages });
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { messagesInInbox, conversationWithInbox } = this.state;
    let messageToSend = '';
    function handleChange(event) {
      messageToSend = event.target.value;
      console.log(messageToSend);
    }
    if (!this.state.messagesInInbox) return <Center w="100%" h="100%"><div>Loading...</div></Center>;
    const test = this.state.messagesInInbox.map((message) => (
      <h1>
        {message.senderAddress}: {message.content}
      </h1>
    ));
    return (
      <Box>
        {this.state.messagesInInbox.slice(-10).map((message, index) => (
          <Box pl="1" key={index}>
            <a
              href={`https://mumbai.polygonscan.com/address/${message.senderAddress}`}
            >
              {message.senderAddress.slice(0, 5)}...
            </a>
            : {message.content}
          </Box>
        ))}
        <Input
          placeholder='Send a message'
          value={this.state.value}
          onChange={this.handleChange}
          mt="30vh"
          className="ChatboxInput"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (!this.state.value) return;
              console.log(`Sending Message ${this.state.value}`);
              conversationWithInbox.send(this.state.value);
              this.setState({ value: "" });
            }
          }}
        />
      </Box>
    );
  }
}

export default XMTPChatbox;
