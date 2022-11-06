import { Player } from '@livepeer/react';
import * as React from 'react';

const playbackId = '76c2of8uysti6e23';
 
export function Livepeer() {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      loop
      autoPlay
      showTitle={false}
      muted
      aspectRatio='3to2'
      poster={<div />}
    />
  );
}
