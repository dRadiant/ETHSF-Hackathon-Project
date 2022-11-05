import logo from './logo.svg';
import './App.css';
import { Livepeer } from './Livepeer';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
 
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
 
function App() {
  return (
    <LivepeerConfig client={client} theme={livepeerTheme}>
      <Livepeer />
    </LivepeerConfig>
  );
}


export default App;
