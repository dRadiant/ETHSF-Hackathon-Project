import { Player } from '@livepeer/react';
import * as React from 'react';
import poster from './images/free_speech.jpeg';

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

const playbackId =
  'bafybeigtqixg4ywcem3p6sitz55wy6xvnr565s6kuwhznpwjices3mmxoe';
 
export function Livepeer() {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      loop
      autoPlay
      showTitle={false}
      muted
      poster={<div />}
    />
  );
}
