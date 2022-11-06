import logo from './logo.svg';
import './App.css';

import { Box, Heading } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'

import { Livepeer } from './components/Livepeer';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import React from 'react';
 
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
  state = {
    
  }

  render() {
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
                  <Box className="ConnectWallet">Connect Wallet</Box>
                </Center>
              </Box>
            </Flex>
          </GridItem>
          <GridItem pl='0' /*bg='pink.300'*/ area={'player'} className="Player">
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
                  <Center w="100%" h="100%">Chatbox</Center>
              </Box>
            </Center>
          </GridItem>
          <GridItem pl='2' /*bg='yellow.300'*/ area={'description'} className="Description">
            Description
          </GridItem>
          <GridItem pl='2' /*bg='blue.300'*/ area={'footer'} className="Footer">
            
          </GridItem>
      </Grid>
      </div>
    );
  }
}

export default App;
