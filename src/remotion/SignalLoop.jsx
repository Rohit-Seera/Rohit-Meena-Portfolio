import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
export const SignalLoop = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 90, [0,45,90], [.5,1,.5], {easing:Easing.inOut(Easing.ease)});
  return <AbsoluteFill style={{background:'#06100a',overflow:'hidden'}}><div style={{position:'absolute',inset:'20%',border:'1px solid rgba(188,255,66,.25)',borderRadius:'50%',transform:`rotate(${frame*.6}deg) scale(${pulse})`}}/><div style={{position:'absolute',inset:'34%',border:'1px dashed rgba(188,255,66,.2)',borderRadius:'50%',transform:`rotate(${-frame*.8}deg)`}}/></AbsoluteFill>;
};
