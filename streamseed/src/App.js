import logo from './logo.svg';
import './App.css';

import { Box, Button, Image, Heading, VStack, HStack } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'

import { LockIcon } from '@chakra-ui/icons'

import { Livepeer } from './components/Livepeer';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text } from '@chakra-ui/react';

import XMTPChatbox from "./components/XMTPChatbox";
 
const client = createReactClient({
  provider: studioProvider({ apiKey: '098c9b05-ebd9-4a18-8477-4ceade2a79b7' }),
});
 
const livepeerTheme = {
  colors: {
    accent: 'rgb(0, 145, 255)',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
};

// Unlock Protocol Mumbai - https://app.unlock-protocol.com/locks/lock?address=0x812b7b78ee707e1bcd32e0622888ff7d968fb2f2&network=80001

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("unlockProtocol", this.unlockHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler);
  }

  unlockHandler = (e) => {
    this.setState({ isUnlocked: e.detail === "unlocked" });
  }

  state = {
    isUnlocked: false
  }

  checkout = () => {
    window.unlockProtocol?.loadCheckoutModal();
  }

  render() {
    const { isUnlocked } = this.state;

    return (
      <div className="App">
        <Grid templateAreas={`"header header" "player chatbox" "description description" "footer footer"`} gridTemplateRows={'7vh 1fr 10vh 5vh'} gridTemplateColumns={'75vw 1fr'} h='100vh' gap='0' color='blackAlpha.700' fontWeight='bold'>
          <GridItem pl='2' /*bg='orange.300'*/ area={'header'} className="Header">
            <Flex>
              <Box p="1vh">
                <Center>StreamSeed</Center>
              </Box>
              <Spacer />
              <Box p="1vh">
                <Center>
                  <ConnectButton />
                </Center>
              </Box>
            </Flex>
          </GridItem>
          <GridItem pl='0' /*bg='pink.300'*/ area={'player'} className="Player">
            {/*<Heading size="sm">My Awesome Stream</Heading>*/}
            <Center w="100%" h="100%">
              <Box className="PlayerContainer">
                <LivepeerConfig client={client} theme={livepeerTheme}>
                  <Livepeer />
                </LivepeerConfig>
              </Box>
            </Center>
          </GridItem>
          <GridItem pl='2' area={'chatbox'} className="Chatbox">
            <Center w="100%" h="100%">
              <Box className="ChatboxContainer">
                  {isUnlocked ? <XMTPChatbox /> : <Center w="100%" h="100%">
                    <VStack spacing="10">
                      <LockIcon boxSize="150" />
                      <Heading size="md" textAlign="center">
                      You must have a membership token to view and chat
                      </Heading>
                      <Button className="JoinButton" onClick={this.checkout} size="lg">Join</Button>
                    </VStack>                    
                  </Center>}
              </Box>
            </Center>
          </GridItem>
          <GridItem pl='2' /*bg='yellow.300'*/ area={'description'} className="Description">
            <Flex justify="left" align="left" ml="2vw" mt="-4vh">
            <HStack spacing="4vw" w="100%" h="100%">
              <HStack>
                  <Image borderRadius='full' boxSize='50px' src='https://bit.ly/dan-abramov' />
                  <Heading size="xs">Epic Creator</Heading>
              </HStack>
              <Box width="50%" pb="8vh" className="DescriptionBox">
                  <Text textAlign="left" p="2">Welcome to my awesome stream, and thanks for reading my awesome description!</Text>
              </Box>
            </HStack>
            </Flex>
          </GridItem>
          <GridItem pl='2' /*bg='blue.300'*/ area={'footer'} className="Footer">
            
          </GridItem>
      </Grid>
      </div>
    );
  }
}

export default App;
