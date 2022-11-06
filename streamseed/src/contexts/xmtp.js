import { createContext } from 'react';
import { Client, Message } from '@xmtp/xmtp-js';
import { Conversation } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';

export const XmtpContext = createContext({
  client,
  conversations,
  loadingConversations,
  initClient,
  convoMessages,
  setConvoMessages,
});

export default XmtpContext;
