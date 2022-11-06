import { Player } from '@livepeer/react';
import * as React from 'react';

/*
import Image from 'next/image';
const PosterImage = () => {
  return (
    <Image
      src={poster}
      layout="fill"
      objectFit="cover"
      priority
      placeholder="blur"
    />
  );
};
 */

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
      aspectRatio="3to2"
      poster={<div />}
    />
  );
}
