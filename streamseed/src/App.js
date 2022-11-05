import logo from './logo.svg';
import './App.css';
import { Livepeer } from './Livepeer';

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
 
const client = createReactClient({
  provider: studioProvider({ apiKey: '63cf12ac-92f1-4653-8aed-6e028af4bbc263cf12ac-92f1-4653-8aed-6e028af4bbc2' }),
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
