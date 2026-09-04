import React from 'react';
import { Composition } from 'remotion';
import { HeroFilm, WeingsFilm, MistellaFilm, ProtoBuyFilm, VfxFilm } from './Films.jsx';

export const RemotionCompositions = () => <>
  <Composition id="HeroFilm" component={HeroFilm} durationInFrames={300} fps={30} width={1920} height={1080} />
  <Composition id="WeingsFilm" component={WeingsFilm} durationInFrames={360} fps={30} width={1920} height={1080} />
  <Composition id="MistellaFilm" component={MistellaFilm} durationInFrames={360} fps={30} width={1920} height={1080} />
  <Composition id="ProtoBuyFilm" component={ProtoBuyFilm} durationInFrames={360} fps={30} width={1920} height={1080} />
  <Composition id="VfxFilm" component={VfxFilm} durationInFrames={300} fps={30} width={1920} height={1080} />
</>;
