import { useCallback, useContext, useEffect, useState } from 'react';
import { useSigner } from 'wagmi';
import { Client } from '@xmtp/xmtp-js';

export default function XmtpProvider() {
  const [client, setClient] = useState();
  const { data: signer, isError, isLoading } = useSigner();
  console.log(signer);

  return <h1>hey</h1>;
}
