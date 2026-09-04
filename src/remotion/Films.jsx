import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';

const green = '#bcff42';
const ink = '#eaf2e8';
const muted = 'rgba(234,242,232,.46)';

const clamp = (v) => Math.max(0, Math.min(1, v));
const fade = (frame, a, b) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
const typeIn = (text, frame, start, end) => text.slice(0, Math.floor(interpolate(frame, [start, end], [0, text.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

function Grid({ accent = green }) {
  return <AbsoluteFill style={{ opacity: .22, backgroundImage: `linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)`, backgroundSize: '64px 64px', maskImage: 'radial-gradient(circle at center, black, transparent 78%)' }} />;
}

function Particles({ frame, accent = green, count = 34, spread = 820 }) {
  return <>{Array.from({ length: count }).map((_, i) => {
    const seed = i * 47.17;
    const x = 50 + Math.sin(seed) * 42;
    const y = 50 + Math.cos(seed * .71) * 38;
    const drift = Math.sin(frame * .025 + seed) * 18;
    const pulse = .25 + .75 * ((Math.sin(frame * .08 + seed) + 1) / 2);
    return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: i % 5 === 0 ? 4 : 2, height: i % 5 === 0 ? 4 : 2, borderRadius: 99, background: accent, opacity: .12 + pulse * .55, boxShadow: `0 0 ${i % 5 === 0 ? 18 : 8}px ${accent}`, transform: `translate(${drift}px, ${Math.cos(frame * .02 + seed) * 14}px)` }} />;
  })}</>;
}

export function HeroFilm() {
  const frame = useCurrentFrame();
  const p = frame / 300;
  const reveal = fade(frame, 10, 75);
  const graph = fade(frame, 55, 150);
  const scan = interpolate(frame, [0, 300], [-15, 115], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nodes = Array.from({ length: 12 });
  return <AbsoluteFill style={{ background: '#06100a', color: ink, overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
    <Grid /><Particles frame={frame} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 68% 46%, rgba(188,255,66,.13), transparent 36%), radial-gradient(circle at 40% 60%, rgba(45,209,110,.08), transparent 42%)' }} />
    <div style={{ position: 'absolute', left: '61%', top: '46%', width: 420, height: 420, transform: `translate(-50%,-50%) rotate(${frame * .15}deg)`, border: `1px solid rgba(188,255,66,${.18 + graph * .18})`, borderRadius: '50%' }} />
    <div style={{ position: 'absolute', left: '61%', top: '46%', width: 260, height: 260, transform: `translate(-50%,-50%) rotate(${-frame * .23}deg)`, border: '1px dashed rgba(188,255,66,.22)', borderRadius: '50%' }} />
    {nodes.map((_, i) => { const a = (Math.PI * 2 * i) / nodes.length + frame * .002; const r = 150 + (i % 3) * 55; const x = 61 + Math.cos(a) * r / 10; const y = 46 + Math.sin(a) * r / 10; return <div key={i} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: 7, height: 7, borderRadius: 99, background: green, opacity: graph * (.4 + (i % 4) * .12), boxShadow: `0 0 20px ${green}`, transform: 'translate(-50%,-50%)' }} />; })}
    <div style={{ position: 'absolute', left: `${scan}%`, top: 0, width: 2, height: '100%', background: `linear-gradient(transparent, ${green}, transparent)`, opacity: .2, boxShadow: `0 0 50px ${green}` }} />
    <div style={{ position: 'absolute', left: 80, top: 80, opacity: reveal }}><div style={{ color: muted, fontSize: 14, letterSpacing: 3 }}>ROHIT MEENA / AI ENGINEER</div><div style={{ marginTop: 16, fontSize: 18, color: green, letterSpacing: 2 }}>SYSTEMS / SIGNAL / INTELLIGENCE</div></div>
    <div style={{ position: 'absolute', left: 80, bottom: 90, opacity: fade(frame, 85, 150), transform: `translateY(${interpolate(frame,[85,150],[35,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}px)` }}>
      <div style={{ fontSize: 74, fontWeight: 800, letterSpacing: -5, lineHeight: .9 }}>I BUILD SYSTEMS<br />THAT MAKE <span style={{ color: green, fontStyle: 'italic' }}>IDEAS</span> USABLE.</div>
    </div>
    <div style={{ position: 'absolute', right: 80, bottom: 90, opacity: fade(frame, 170, 235), textAlign: 'right', fontFamily: 'monospace', fontSize: 14, color: muted }}>RAG → AGENTS → VOICE → BACKENDS<br /><span style={{ color: green }}>● SYSTEM ONLINE</span></div>
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent ${clamp(p)*100 - 4}%, rgba(188,255,66,.12) ${clamp(p)*100}%, transparent ${clamp(p)*100 + 4}%)`, mixBlendMode: 'screen', opacity: .35 }} />
  </AbsoluteFill>;
}

export function WeingsFilm() {
  const frame = useCurrentFrame();
  const t = frame / 360;
  const stages = [
    { at: 0, label: 'VOICE INPUT' }, { at: .18, label: 'SPEECH TO TEXT' }, { at: .38, label: 'REASONING CORE' }, { at: .58, label: 'MEMORY / CONTEXT' }, { at: .76, label: 'TEXT TO SPEECH' }, { at: .92, label: 'VOICE RESPONSE' }
  ];
  const stage = [...stages].reverse().find(s => t >= s.at) || stages[0];
  const wave = Array.from({ length: 70 });
  const pulse = .8 + .2 * Math.sin(frame * .12);
  const coreScale = 1 + Math.sin(frame * .06) * .03;
  return <AbsoluteFill style={{ background: '#050907', color: ink, overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
    <Grid /><Particles frame={frame} count={50} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(188,255,66,.12), transparent 32%), radial-gradient(circle at 50% 50%, rgba(45,209,110,.06), transparent 56%)' }} />
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 250, height: 250, transform: `translate(-50%,-50%) scale(${coreScale})`, borderRadius: '50%', border: '1px solid rgba(188,255,66,.5)', boxShadow: `0 0 80px rgba(188,255,66,.12), inset 0 0 70px rgba(188,255,66,.08)` }} />
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 100, height: 100, transform: 'translate(-50%,-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,255,66,.8), rgba(188,255,66,.06) 60%, transparent 70%)', filter: 'blur(1px)' }} />
    {wave.map((_, i) => { const x = (i / (wave.length - 1)) * 100; const amp = 7 + Math.abs(Math.sin(i * .9 + frame * .09)) * 32; return <div key={i} style={{ position: 'absolute', left: `${8 + x * .84}%`, top: `${50 + Math.sin(i * .32 + frame * .04) * amp * .45}%`, width: 3, height: amp, background: green, opacity: .12 + .5 * Math.abs(Math.sin(frame * .05 + i)), transform: 'translateY(-50%)', borderRadius: 4 }} />; })}
    <div style={{ position: 'absolute', left: 72, top: 68, fontFamily: 'monospace', fontSize: 14, letterSpacing: 3, color: muted }}>WEINGS AI / CONVERSATION ENGINE</div>
    <div style={{ position: 'absolute', left: 72, top: 102, color: green, fontFamily: 'monospace', fontSize: 12 }}>{stage.label} / {String(stage.at * 100).padStart(2,'0')}%</div>
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, 155px)', textAlign: 'center', fontFamily: 'monospace', color: muted, fontSize: 12, letterSpacing: 2 }}>
      VOICE <span style={{ color: green }}>→</span> STT <span style={{ color: green }}>→</span> REASON <span style={{ color: green }}>→</span> MEMORY <span style={{ color: green }}>→</span> TTS <span style={{ color: green }}>→</span> VOICE
    </div>
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}><div style={{ fontSize: 17, letterSpacing: 5, color: muted }}>VOICE CORE</div><div style={{ marginTop: 12, fontSize: 52, fontWeight: 800, letterSpacing: -3 }}>{typeIn(stage.label, frame, stage.at * 360, stage.at * 360 + 45)}</div></div>
    <div style={{ position: 'absolute', right: 72, bottom: 68, textAlign: 'right', fontFamily: 'monospace', fontSize: 12, color: muted }}>FRAME {String(frame).padStart(4,'0')}<br /><span style={{ color: green }}>SIGNAL STABLE / {Math.round(pulse * 100)}%</span></div>
  </AbsoluteFill>;
}

export function MistellaFilm() {
  const frame = useCurrentFrame();
  const t = frame / 360;
  const phases = ['DOCUMENT', 'CHUNKING', 'EMBEDDINGS', 'FAISS + BM25', 'CONTEXT', 'LLM RESPONSE'];
  const idx = Math.min(phases.length - 1, Math.floor(t * phases.length));
  const local = (t * phases.length) % 1;
  const chunks = Array.from({ length: 7 });
  return <AbsoluteFill style={{ background: '#060b10', color: ink, overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
    <Grid accent="#8cffea" /><Particles frame={frame} accent="#8cffea" count={42} />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(74,216,196,.09), transparent 42%)' }} />
    <div style={{ position: 'absolute', left: 72, top: 68, fontFamily: 'monospace', color: muted, letterSpacing: 3 }}>MISTELLA / AI WORKSPACE</div>
    <div style={{ position: 'absolute', left: 72, bottom: 68, fontFamily: 'monospace', color: '#8cffea', fontSize: 13 }}>RAG PIPELINE / {phases[idx]}</div>
    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 250, height: 320, transform: `translate(-50%,-50%) rotateY(${interpolate(frame,[0,360],[0,18])}deg) translateX(${idx < 2 ? 0 : -120}px)`, border: '1px solid rgba(140,255,234,.35)', background: 'rgba(140,255,234,.03)', boxShadow: '0 0 60px rgba(140,255,234,.06)' }}>
      <div style={{ padding: 24, fontFamily: 'monospace', fontSize: 11, color: muted }}>research.pdf</div>
      {chunks.map((_, i) => <div key={i} style={{ margin: '10px 24px', height: 5 + (i % 3) * 3, background: i <= idx ? '#8cffea' : 'rgba(140,255,234,.12)', opacity: .35 + (i === idx ? .65 : 0), transform: `translateX(${i <= 2 ? local * 80 : 0}px)`, transition: 'none' }} />)}
    </div>
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) translateX(${idx >= 2 ? 310 : 0}px)`, width: 190, height: 190, border: '1px solid rgba(140,255,234,.24)', borderRadius: '50%', opacity: idx >= 2 ? 1 : .15 }}>
      {Array.from({ length: 18 }).map((_, i) => <span key={i} style={{ position: 'absolute', left: `${50 + Math.cos(i) * 40}%`, top: `${50 + Math.sin(i) * 40}%`, width: 5, height: 5, borderRadius: 99, background: '#8cffea', boxShadow: '0 0 15px #8cffea', opacity: .5 }} />)}
    </div>
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%,-50%) translateX(${idx >= 4 ? 500 : 0}px)`, opacity: idx >= 4 ? 1 : 0, textAlign: 'center' }}><div style={{ fontFamily: 'monospace', color: muted }}>CONTEXT WINDOW</div><div style={{ fontSize: 48, fontWeight: 800, marginTop: 12 }}>ANSWER</div></div>
    <div style={{ position: 'absolute', left: 72, top: '50%', transform: 'translateY(-50%)', fontFamily: 'monospace', color: muted, lineHeight: 2, fontSize: 13 }}>PARSE<br />CHUNK<br />EMBED<br />RETRIEVE<br />RERANK<br /><span style={{ color: '#8cffea' }}>GENERATE</span></div>
  </AbsoluteFill>;
}

export function ProtoBuyFilm() {
  const frame = useCurrentFrame();
  const amber = '#ffb02e';
  const lime = '#c4ff42';
  const t = frame / 360;

  const steps = [
    ['REQUEST','USER → BUYER AGENT'],
    ['SEARCH','CATALOG MATCH'],
    ['GUARDRAIL','RULE CHECK'],
    ['AUTONOMY','LIMIT CHECK'],
    ['DECISION','APPROVE / CONFIRM'],
    ['AUDIT','TRACE RECORDED'],
  ];
  const step = Math.min(steps.length - 1, Math.floor(t * steps.length));
  const progress = (t * steps.length) % 1;

  const Node = ({x,y,label,active}) => (
    <div style={{
      position:'absolute', left:`${x}%`, top:`${y}%`, transform:'translate(-50%,-50%)',
      width:140, height:54, border:`1px solid ${active ? amber : 'rgba(255,176,46,.27)'}`,
      background:'rgba(255,176,46,.025)', display:'grid', placeItems:'center',
      color:active ? ink : muted, fontFamily:'monospace', fontSize:10,
      boxShadow:active ? '0 0 30px rgba(255,176,46,.1)' : 'none',
    }}>{label}</div>
  );

  return (
    <AbsoluteFill style={{background:'#060403', color:ink, overflow:'hidden', fontFamily:'Arial,sans-serif'}}>
      <Grid color="255,176,46" opacity={.035} size={70}/>
      <Particles frame={frame} accent={amber} count={28}/>
      <AbsoluteFill style={{background:'radial-gradient(circle at 51% 49%,rgba(255,176,46,.10),transparent 40%)'}}/>

      <div style={{position:'absolute',left:58,top:54,fontFamily:'monospace',fontSize:12,letterSpacing:3,color:muted}}>
        PROTOBUY / AGENTIC COMMERCE
      </div>

      <div style={{position:'absolute',right:58,top:54,textAlign:'right',fontFamily:'monospace',fontSize:9,lineHeight:1.7,color:muted}}>
        BOUNDED AUTONOMY<br/>PROMPT INJECTION DEFENSE<br/>FAILURE RECOVERY
      </div>

      <svg viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid meet" style={{position:'absolute',left:'6%',right:'6%',top:'15%',bottom:'13%',width:'88%',height:'72%'}}>
        <defs>
          <linearGradient id="pbLine" x1="0" x2="1">
            <stop offset="0" stopColor="#ffb02e" stopOpacity=".08"/>
            <stop offset="1" stopColor="#ffb02e" stopOpacity=".75"/>
          </linearGradient>
        </defs>

        <g fill="none" stroke="url(#pbLine)" strokeWidth="2">
          <line x1="120" y1="325" x2="340" y2="325" opacity=".72"/>
          <line x1="340" y1="325" x2="530" y2="180" opacity=".58"/>
          <line x1="340" y1="325" x2="530" y2="470" opacity=".9"/>
          <line x1="530" y1="180" x2="765" y2="220" opacity=".35"/>
          <line x1="530" y1="470" x2="765" y2="220" opacity=".5"/>
          <line x1="530" y1="470" x2="765" y2="470" opacity=".6"/>
        </g>

        {[['120','325'],['340','325'],['530','180'],['530','470'],['765','220'],['765','470']].map(([cx,cy],i)=>(
          <circle key={i} cx={cx} cy={cy} r={i===3 && step>=2 ? 8 : 6} fill={amber} opacity={.8}/>
        ))}

        <g fontFamily="monospace" fontSize="16" fill="#eaf2e8">
          <text x="120" y="365" textAnchor="middle">USER</text>
          <text x="340" y="365" textAnchor="middle">BUYER AGENT</text>
          <text x="530" y="154" textAnchor="middle">CATALOG</text>
          <text x="530" y="510" textAnchor="middle">GUARDRAIL</text>
          <text x="765" y="194" textAnchor="middle">PAYMENT</text>
          <text x="765" y="510" textAnchor="middle">AUDIT LOG</text>
        </g>

        <circle cx={340 + 190*progress} cy={325 - 145*progress} r="7" fill={amber} opacity={step>=1 ? 1 : 0}/>
        <circle cx={340 + 190*progress} cy={325 + 145*progress} r="7" fill={amber} opacity={step>=2 ? 1 : 0}/>
        <circle cx={530 + 235*progress} cy={470 - 250*progress} r="7" fill={amber} opacity={step>=4 ? 1 : 0}/>
      </svg>

      <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)',textAlign:'center',width:'min(420px,70vw)'}}>
        <div style={{fontFamily:'monospace',fontSize:11,letterSpacing:3,color:muted}}>DECISION ENGINE</div>
        <div style={{marginTop:12,fontSize:46,fontWeight:800,letterSpacing:-3}}>{steps[step][0]}</div>
        <div style={{marginTop:8,fontFamily:'monospace',fontSize:11,color:amber}}>{steps[step][1]}</div>
      </div>

      <div style={{position:'absolute',left:'50%',bottom:72,transform:'translateX(-50%)',fontFamily:'monospace',fontSize:10,color:muted,whiteSpace:'nowrap'}}>
        SEARCH <span style={{color:amber}}>→</span> CHECK <span style={{color:amber}}>→</span> ACT <span style={{color:amber}}>→</span> RECOVER
      </div>

      <div style={{position:'absolute',left:58,bottom:54,fontFamily:'monospace',fontSize:10,color:amber}}>
        SCROLL-SCRUBBED / {String(frame).padStart(4,'0')}
      </div>
      <div style={{position:'absolute',right:58,bottom:54,fontFamily:'monospace',fontSize:9,color:muted,textAlign:'right'}}>
        PAYMENT GATE<br/>AUDITABLE DECISIONS
      </div>
    </AbsoluteFill>
  );
}

export function MobileHeroFilm() {
  const frame = useCurrentFrame();
  const green = '#c4ff42';
  const cyan = '#8cffea';
  const dots = Array.from({length:18});

  return (
    <AbsoluteFill style={{background:'#020504', overflow:'hidden'}}>
      <Grid opacity={.055} size={46}/>
      <AbsoluteFill style={{
        background:'radial-gradient(circle at 72% 44%,rgba(196,255,66,.17),transparent 27%),radial-gradient(circle at 28% 70%,rgba(140,255,234,.07),transparent 36%)'
      }}/>
      <div style={{
        position:'absolute', left:'71%', top:'43%', width:250, height:250,
        border:'1px solid rgba(196,255,66,.28)', borderRadius:'50%',
        transform:`translate(-50%,-50%) rotate(${frame*.16}deg)`
      }}/>
      <div style={{
        position:'absolute', left:'71%', top:'43%', width:166, height:166,
        border:'1px dashed rgba(140,255,234,.22)', borderRadius:'50%',
        transform:`translate(-50%,-50%) rotate(${-frame*.22}deg)`
      }}/>
      <div style={{
        position:'absolute', left:'71%', top:'43%', width:64, height:64,
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(196,255,66,.95),rgba(196,255,66,.08) 62%,transparent 72%)',
        boxShadow:'0 0 65px rgba(196,255,66,.22)'
      }}/>
      {dots.map((_,i)=>{
        const a=i/18*Math.PI*2+frame*.008;
        const r=65+(i%3)*32;
        const accent=i%3===0?cyan:green;
        return <i key={i} style={{
          position:'absolute',
          left:`${71+Math.cos(a)*r/10}%`,
          top:`${43+Math.sin(a)*r/11}%`,
          width:i%4===0?5:3,height:i%4===0?5:3,borderRadius:99,
          background:accent,boxShadow:`0 0 12px ${accent}`,
          opacity:.2+.45*((Math.sin(frame*.08+i)+1)/2),
          transform:'translate(-50%,-50%)'
        }}/>;
      })}
      <div style={{
        position:'absolute',left:'12%',right:'6%',top:'43%',height:1,
        background:`linear-gradient(90deg,transparent,${green},transparent)`,
        opacity:.22
      }}/>
      <div style={{position:'absolute',left:'7%',bottom:'11%',fontFamily:'monospace',fontSize:9,letterSpacing:2,color:'rgba(237,244,237,.42)'}}>
        ROHIT MEENA / AI / ML
      </div>
      <div style={{position:'absolute',right:'7%',bottom:'11%',fontFamily:'monospace',fontSize:7,color:green,letterSpacing:1.5}}>
        ● SIGNAL ACTIVE
      </div>
    </AbsoluteFill>
  );
}

export function VfxFilm() {
  const frame = useCurrentFrame();
  const playhead = interpolate(frame, [0, 300], [8, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const frames = Array.from({ length: 9 });
  return <AbsoluteFill style={{ background: '#120d0a', color: ink, overflow: 'hidden', fontFamily: 'Arial, sans-serif' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(255,176,46,.1), transparent 40%), linear-gradient(115deg,#120d0a,#080807)' }} />
    <div style={{ position: 'absolute', inset: 40, border: '1px solid rgba(255,255,255,.08)' }} />
    <div style={{ position: 'absolute', left: 72, top: 68, fontFamily: 'monospace', color: muted, letterSpacing: 3 }}>VFX / EDITOR — SHOWREEL</div>
    <div style={{ position: 'absolute', left: 72, top: 150, fontSize: 68, fontWeight: 800, letterSpacing: -4 }}>CUT / GRADE / <span style={{ color: '#ffb02e', fontStyle: 'italic' }}>MAKE</span></div>
    <div style={{ position: 'absolute', left: 72, right: 72, bottom: 150, height: 150, borderTop: '1px solid rgba(255,255,255,.15)', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
      {frames.map((_,i) => <div key={i} style={{ position: 'absolute', left: `${i*11}%`, top: 18, width: '9%', height: 112, border: `1px solid rgba(255,176,46,${i%3===0?.55:.16})`, background: `linear-gradient(${100+i*12}deg, rgba(255,176,46,.08), rgba(255,255,255,.015))`, overflow:'hidden' }}><div style={{ width:'150%', height:'100%', background:`radial-gradient(circle at ${20+i*7}% ${40+i*3}%, rgba(255,176,46,.28), transparent 20%), linear-gradient(120deg, transparent 40%, rgba(255,255,255,.08) 41%, transparent 43%)`, transform:`translateX(${Math.sin(frame*.03+i)*12}px)` }}/></div>)}
      <div style={{ position:'absolute', left:`${playhead}%`, top:-8, width:2, height:166, background:'#ffb02e', boxShadow:'0 0 25px rgba(255,176,46,.7)' }}/>
    </div>
    <div style={{ position:'absolute', left:72, bottom:68, fontFamily:'monospace', fontSize:12, color:muted }}>00:00:{String(Math.floor(frame/30)).padStart(2,'0')}:00 &nbsp; / &nbsp; RAW → CUT → VFX → COLOR → FINAL</div>
  </AbsoluteFill>;
}
