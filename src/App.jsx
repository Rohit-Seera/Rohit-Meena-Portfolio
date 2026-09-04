import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Player } from '@remotion/player';
import portrait from '../assets/rohit-meena-portrait.png';
import resume from '../assets/Rohit_Meena_Resume.pdf';
import { HeroFilm, MobileHeroFilm, WeingsFilm, MistellaFilm, ProtoBuyFilm, VfxFilm } from './remotion/Films.jsx';

const engineerProjects = [
  {id:'weings',no:'01',name:'WEINGS AI',short:'VOICE AI',type:'VOICE AI / CONVERSATION ENGINE',metric:'HUMAN-LIKE AI VOICE COMPANION',desc:'Voice-first conversations with persistent context and personalized interaction.',stack:'STT · LLM · MEMORY · TTS',film:WeingsFilm,accent:'lime',detail:'A human-like AI voice companion designed around meaningful conversations, long-term context and personalized interaction.'},
  {id:'mistella',no:'02',name:'MISTELLA',short:'RAG',type:'FULL-STACK GENAI WORKSPACE',metric:'RAG · LANGGRAPH · FASTAPI',desc:'One workspace for chat, files, image understanding and research.',stack:'FAISS · BM25 · SSE · POSTGRESQL',film:MistellaFilm,accent:'cyan',liveUrl:'https://mistella-ai.vercel.app/',detail:'A full-stack AI workspace unifying LLM chat, conversational memory, multimodal understanding, document-grounded RAG and research.'},
  {id:'protobuy',no:'03',name:'PROTOBUY',short:'AGENTS',type:'AGENTIC COMMERCE',metric:'BOUNDED AUTONOMY',desc:'An agent that searches, decides, pays and stops when a guardrail says so.',stack:'FASTAPI · GROQ/LLAMA · RAZORPAY',film:ProtoBuyFilm,accent:'amber',detail:'Conversational commerce with bounded autonomy, confirmation gates, audit trails, prompt-injection defense and failure recovery.'},
  {id:'20news',no:'04',name:'20 NEWSGROUPS',short:'NLP',type:'NLP / TEXT CLASSIFICATION',metric:'94.36% RANDOM FOREST',desc:'A text pipeline from messy documents to measurable model comparison.',stack:'TF-IDF · BOW · SVM · RANDOM FOREST',film:null,accent:'blue',detail:'Preprocessing, TF-IDF / Bag of Words and model comparison across Naive Bayes, SVM and Random Forest.'},
  {id:'health',no:'05',name:'HEALTHCARE ANN',short:'PYTORCH',type:'PYTORCH NEURAL NETWORK',metric:'99.12% TEST ACCURACY',desc:'A compact binary classification network with a complete training story.',stack:'30→16→8→1 · BCE · SGD',film:null,accent:'lime',detail:'A PyTorch ANN for breast-cancer classification using ReLU hidden layers, sigmoid output, binary cross-entropy and SGD over 200 epochs.'},
  {id:'student',no:'06',name:'STUDENT SUCCESS',short:'ML',type:'CLASSICAL MACHINE LEARNING',metric:'SMOTE · ROC · LOGISTIC REGRESSION',desc:'An imbalance-aware academic prediction pipeline.',stack:'SCIKIT-LEARN · SMOTE · ROC',film:null,accent:'violet',detail:'A logistic-regression pipeline using SMOTE and class-weight optimization, with classification report, confusion matrix and ROC analysis.'}
];

const creativeProjects = [
  {id:'ai-visuals',no:'01',name:'AI VISUAL PRODUCTION',type:'PHOTOGPT / TAIC LLC',metric:'300+ AI-GENERATED VISUAL ASSETS',desc:'AI image and video generation for campaigns and social creatives.',stack:'PROMPT · IMAGE · VIDEO · ITERATION',film:VfxFilm,accent:'coral'},
  {id:'niimack',no:'02',name:'NIIMACK FEST FILM',type:'EDITING / VFX / DIRECTION',metric:'OFFICIAL DOCUMENTARY',desc:'A campus story shaped from the cut through VFX, grade and narrative.',stack:'EDIT · VFX · COLOR · STORY',film:VfxFilm,accent:'coral'},
  {id:'alumni',no:'03',name:'ALUMNI RECONNECT',type:'VISUAL IDENTITY',metric:'IIIT BHOPAL',desc:'A recognisable visual system for the Alumni Reconnect Cell.',stack:'IDENTITY · VISUAL SYSTEM',film:VfxFilm,accent:'coral'}
];

const skills={
  CORE:['Python','C/C++','HTML/CSS','PyTorch','scikit-learn','FastAPI','REST APIs','PostgreSQL','SQLite','Git','GitHub','LangChain','LangGraph','Advanced RAG','FAISS','BM25','Hugging Face Transformers','Pandas','NumPy','Matplotlib','Seaborn','ComfyUI','SSE'],
  ACTIVE:['LLMs','Agentic AI','Voice AI','Multimodal AI','Prompt Engineering','Vector Search','Model Evaluation','Authentication','Deployment','SQL','Linux / Ubuntu','Windows'],
  'AI TOOLING':['ChatGPT','Claude','Gemini','Perplexity','Grok','ComfyUI','Jupyter Notebook','VS Code'],
  'BUILDING NEXT':['LLM Evaluation','Langfuse / Opik','Docker','Redis','pgvector','LiteLLM','Pytest','Ruff','uv','Cloud deployment']
};

const skillLinks={
  Python:['WEINGS AI','MISTELLA','PROTOBUY','ML PROJECTS'],
  'C/C++':['CODEFORCES'],
  PyTorch:['HEALTHCARE ANN'],
  'scikit-learn':['20 NEWSGROUPS','STUDENT SUCCESS'],
  FastAPI:['WEINGS AI','MISTELLA','PROTOBUY'],
  'REST APIs':['WEINGS AI','MISTELLA','PROTOBUY'],
  RAG:['MISTELLA'],
  'Advanced RAG':['MISTELLA'],
  LangChain:['MISTELLA'],
  LangGraph:['MISTELLA'],
  FAISS:['MISTELLA'],
  BM25:['MISTELLA'],
  'Hugging Face Transformers':['TRANSFORMER / LLM WORK'],
  'Voice AI':['WEINGS AI'],
  'Agentic AI':['PROTOBUY'],
  'Prompt Engineering':['PHOTOGPT'],
  ComfyUI:['PHOTOGPT'],
  'Model Evaluation':['20 NEWSGROUPS','HEALTHCARE ANN','STUDENT SUCCESS'],
  'LLM Evaluation':['MISTELLA','PROTOBUY'],
  ChatGPT:['GENAI WORKFLOWS'],
  Claude:['GENAI WORKFLOWS'],
  Gemini:['MISTELLA','GENAI WORKFLOWS'],
  Perplexity:['RESEARCH WORKFLOWS'],
  Grok:['GENAI WORKFLOWS'],
  ComfyUI:['PHOTOGPT'],
  'Jupyter Notebook':['ML PROJECTS'],
  'VS Code':['ALL BUILDS'],
  Redis:['VOICE / BACKEND SYSTEMS'],
};

const repoSignals=[
  ['MISTELLA','FULL-STACK AI · RAG · AGENTIC WORKSPACE','PUBLIC','https://github.com/Rohit-Seera/Mistella-Your-AI-Workspace'],
  ['PROTOBUY','AGENTIC COMMERCE · GUARDED PAYMENTS','PUBLIC','https://github.com/Rohit-Seera/ProtoBuy'],
  ['20 NEWSGROUPS','NLP · TF-IDF · BOW · MODEL COMPARISON','PUBLIC','https://github.com/Rohit-Seera/20NewsGroups-Text-Classification'],
  ['CODEFORCES SOLUTIONS','C++ · DSA · ALGORITHMIC PRACTICE','PUBLIC','https://github.com/Rohit-Seera/codeforces-solutions'],
  ['STUDENT SUCCESS','LOGISTIC REGRESSION · SMOTE · ROC','PUBLIC','https://github.com/Rohit-Seera/Student-success-predictor'],
  ['BREAST CANCER ANN','PYTORCH · ANN · EVALUATION','PUBLIC','https://github.com/Rohit-Seera/Breast-Cancer-Prediction-using-Artificial-Neural-Network-PyTorch-'],
];

function FilmPlayer({Component,playerRef,progress=0,duration=360,className=''}) {
  useEffect(()=>{
    const id=requestAnimationFrame(()=>playerRef.current?.seekTo(Math.max(0,Math.min(duration-1,progress*(duration-1)))));
    return()=>cancelAnimationFrame(id);
  },[Component,progress,duration,playerRef]);
  return <Player ref={playerRef} component={Component} durationInFrames={duration} compositionWidth={1920} compositionHeight={1080} fps={30} loop={false} autoPlay={false} controls={false} clickToPlay={false} style={{width:'100%',height:'100%'}} className={className}/>;
}

function MLFilm({project,progress}) {
  const layers=project.id==='health'?[30,16,8,1]:project.id==='student'?[8,6,2]:[7,12,8];
  const labels=project.id==='20news'?['TOKENS','TF-IDF / BOW','MODELS']:project.id==='student'?['DATA','SMOTE','MODEL']:['INPUT','HIDDEN','HIDDEN','OUTPUT'];
  return <div className="ml-film">
    <div className="ml-backdrop"/>
    <div className="ml-topline"><span>{project.no} / MACHINE LEARNING</span><b>{String(Math.round(progress*100)).padStart(2,'0')}%</b></div>
    <div className="ml-title">{project.name}</div>
    <div className="ml-network">
      {layers.map((n,i)=><div key={i} className="ml-layer"><small>{labels[i]}</small><div className="ml-nodes">{Array.from({length:Math.min(n,12)}).map((_,j)=><i key={j} style={{'--j':j,'--p':progress}}/>)}</div></div>)}
    </div>
    <div className="ml-scanline" style={{left:`${progress*100}%`}}/>
    <div className="ml-footer"><strong>{project.metric}</strong><span>{project.stack}</span></div>
  </div>;
}

function ProjectCard({project,index,offset,onOpen,mode}) {
  const abs=Math.abs(offset);
  const scale=abs<.5?1.025:.985;
  const x=0;
  const y=abs<.5?-5:Math.min(abs,3)*2;
  const rotate=abs<.5?0:offset*.18;
  const opacity=abs>3?.52:1-Math.min(abs,3)*.10;
  return <button type="button"
    className={`project-card accent-${project.accent||'coral'} ${abs<.5?'is-active':''}`}
    style={{'--card-x':`${x}%`,'--card-y':`${y}px`,'--card-scale':scale,'--card-rotate':`${rotate}deg`,'--card-opacity':opacity,'--card-z':Math.round(40-abs*2),'--card-lift':`${y}px`}}
    onClick={()=>onOpen(project)}
    aria-label={`Open ${project.name} case study`}
  >
    <span className="card-no">{project.no}</span>
    <div className="card-top"><span>{project.type}</span><b>{project.liveUrl?'LIVE + FILM ↗':project.film?'OPEN FILM ↗':'INSPECT ↗'}</b></div>
    <div className="card-aura"/>
    <div className="card-number">{String(index+1).padStart(2,'0')}</div>
    <div className="project-visual-core">
      {mode==='engineer' ? (
        project.id==='weings'?<div className="mini-wave">{Array.from({length:22}).map((_,i)=><i key={i} style={{'--i':i}}/>)}</div>:
        project.id==='mistella'?<div className="mini-rag"><span>PDF</span><i/><i/><i/><b>RAG</b></div>:
        project.id==='protobuy'?<div className="mini-agent"><span>USER</span><i/><b>AGENT</b><i/><em>GUARDRAIL</em></div>:
        project.id==='20news'?<div className="mini-ml"><i/><i/><i/><b>94.36%</b></div>:
        project.id==='health'?<div className="mini-net"><i/><i/><i/><i/><i/></div>:
        <div className="mini-chart"><i/><i/><i/><i/></div>
      ) : <div className="mini-frame"><span>FRAME</span><i/><b>VFX</b></div>}
    </div>
    <div className="card-content"><small>{project.short||project.type}</small><h3>{project.name}</h3><strong>{project.metric}</strong><em>{project.stack}</em></div>
    <div className="card-edge"><span>CLICK TO INSPECT</span><b>{mode==='engineer'?'AI / ML':'VFX / EDITOR'}</b></div>
  </button>
}

function App(){
  const [mode,setMode]=useState('engineer');
  const [active,setActive]=useState(0);
  const [workProgress,setWorkProgress]=useState(0);
  const [selectedProject,setSelectedProject]=useState(0);
  const [heroProgress,setHeroProgress]=useState(0);
  const [detail,setDetail]=useState(null);
  const [detailProgress,setDetailProgress]=useState(0);
  const [skill,setSkill]=useState(null);
  const [musicPlaying,setMusicPlaying]=useState(false);

  const rootRef=useRef(null), heroPlayerRef=useRef(null), detailPlayerRef=useRef(null), audioRef=useRef(null), soundcloudRef=useRef(null), soundcloudWidgetRef=useRef(null);
  const projects=mode==='engineer'?engineerProjects:creativeProjects;

  useEffect(()=>{document.title=mode==='engineer'?'Rohit Meena — AI / ML Engineer':'Rohit Meena — VFX / Editor'},[mode]);

  useEffect(()=>{
    const setup=()=>{
      if(!window.SC?.Widget || !soundcloudRef.current) return;
      const widget=window.SC.Widget(soundcloudRef.current);
      soundcloudWidgetRef.current=widget;
      widget.bind(window.SC.Widget.Events.PLAY,()=>setMusicPlaying(true));
      widget.bind(window.SC.Widget.Events.PAUSE,()=>setMusicPlaying(false));
      widget.bind(window.SC.Widget.Events.FINISH,()=>setMusicPlaying(false));
    };
    if(window.SC?.Widget){ setup(); return; }
    const script=document.createElement('script');
    script.src='https://w.soundcloud.com/player/api.js';
    script.async=true;
    script.onload=setup;
    document.head.appendChild(script);
    const timer=setTimeout(setup,1400);
    return()=>{clearTimeout(timer); if(script.parentNode) script.parentNode.removeChild(script); soundcloudWidgetRef.current=null;};
  },[]);

  const toggleMusic=()=>{
    const widget=soundcloudWidgetRef.current;
    if(widget){ widget.toggle(); return; }
    setTimeout(()=>soundcloudWidgetRef.current?.toggle(),250);
  };

  useEffect(()=>{
    let raf=0;
    const update=()=>{
      raf=0;
      const scenes=[...document.querySelectorAll('[data-scene]')], vh=innerHeight;
      let nearest=0,dist=Infinity;
      scenes.forEach((scene,i)=>{
        const r=scene.getBoundingClientRect();
        const p=Math.max(0,Math.min(1,(vh-r.top)/Math.max(1,r.height)));
        scene.style.setProperty('--progress',p.toFixed(4));
        if(scene.id==='home')setHeroProgress(p);
        if(scene.id==='work'){setWorkProgress(p);setSelectedProject(Math.min(projects.length-1,Math.max(0,Math.round(p*(projects.length-1)))));}
        const d=Math.abs(r.top+r.height/2-vh/2);
        if(d<dist){dist=d;nearest=i;}
      });
      setActive(nearest);
    };
    update();
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll);
    return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
  },[mode]);

  useEffect(()=>{
    const move=e=>{
      rootRef.current?.style.setProperty('--mx',`${(e.clientX/innerWidth-.5)*2}`);
      rootRef.current?.style.setProperty('--my',`${(e.clientY/innerHeight-.5)*2}`);
    };
    addEventListener('pointermove',move,{passive:true});
    return()=>removeEventListener('pointermove',move);
  },[]);

  useEffect(()=>{
    if(!detail)return;
    document.body.style.overflow='hidden';
    const onKey=e=>{if(e.key==='Escape'){setDetail(null);setDetailProgress(0)}};
    const onWheel=e=>{e.preventDefault();setDetailProgress(p=>Math.max(0,Math.min(1,p+e.deltaY/1250)))};
    addEventListener('keydown',onKey);addEventListener('wheel',onWheel,{passive:false});
    return()=>{document.body.style.overflow='';removeEventListener('keydown',onKey);removeEventListener('wheel',onWheel)};
  },[detail]);

  const sectionNames=useMemo(()=>mode==='engineer'
    ?['INTRO','MODES','TELEMETRY','WORK','STACK','EXPERIENCE','SIGNALS','CONTACT']
    :['INTRO','MODES','REEL','WORK','TOOLKIT','EXPERIENCE','CONTACT'],[mode]);

  const activeProjectIndex=selectedProject;
  const openProject=p=>{setDetail(p);setDetailProgress(0)};
  const closeProject=()=>{setDetail(null);setDetailProgress(0)};

  return <div ref={rootRef} className={`app ${mode==='engineer'?'mode-lime':'mode-coral'}`}>
    <div className="grain"/><div className="ambient-grid"/><div className="cursor-orb"/>
    <button className={`music-tab ${musicPlaying?'playing':''}`} onClick={toggleMusic} aria-label={musicPlaying?'Pause Apocalypse':'Play Apocalypse'} title={musicPlaying?'Pause Apocalypse':'Play Apocalypse'}>
      <span className="music-eq"><i/><i/><i/><i/></span><b>{musicPlaying?'Ⅱ':'▶'}</b>
    </button>
    <iframe
      ref={soundcloudRef}
      className="soundcloud-audio-host"
      title="Official SoundCloud audio host for Apocalypse — Cigarettes After Sex"
      src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fcigarettesaftersex%2Fapocalypse-3&color=%23c4ff42&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false"
      allow="autoplay"
    />

    <header className="nav">
      <a className="mark" href="#home" aria-label="Rohit Meena home">RM<span>©</span></a>
      <div className="nav-center"><span>ROHIT MEENA</span><b>{sectionNames[Math.min(active,sectionNames.length-1)]}</b></div>
      <div className="nav-actions">
        <button className={`sound-toggle ${musicPlaying?'on':''}`} onClick={toggleMusic} aria-label="Open music player"><i/><span>MUSIC</span></button>
        <a className="mail" href="mailto:rrrohitmeena@gmail.com">OPEN TO CREATE <b>↗</b></a>
      </div>
    </header>

    <aside className="scroll-index">{sectionNames.map((x,i)=><a key={x} href={['#home','#modes','#telemetry','#work','#stack','#experience','#signals','#contact'][i]||'#contact'} className={active===i?'is-active':''}>{String(i+1).padStart(2,'0')} {x}</a>)}</aside>

    <main>
      <section id="home" className="scene hero-scene" data-scene>
        <div className="sticky hero-stage">
          <div className="hero-film"><FilmPlayer Component={mode==='engineer'?HeroFilm:VfxFilm} playerRef={heroPlayerRef} progress={.02+heroProgress*.96} duration={300}/></div>
          <div className="mobile-hero-film" aria-hidden="true">
            <Player component={MobileHeroFilm} durationInFrames={240} compositionWidth={900} compositionHeight={1600} fps={30} loop autoPlay controls={false} clickToPlay={false} style={{width:'100%',height:'100%'}}/>
          </div>
          <div className="mobile-hero-signal" aria-hidden="true">
            <i/><i/><i/><span>AI / ML</span>
          </div>
          <div className="hero-copy-block">
            <p className="kicker">01 — {mode==='engineer'?'AI / ML ENGINEER':'VFX / EDITOR'}</p>
            <h1>ROHIT<br/><span>MEENA.</span></h1>
            <p className="hero-sub">{mode==='engineer'?'LLM SYSTEMS · RAG · AGENTS · VOICE AI':'EDITING · VFX · COLOR · AI VISUALS'}</p>
            <p className="hero-copy">{mode==='engineer'?'I build intelligent systems across retrieval, agentic workflows, voice AI and machine learning — turning technical ideas into things people can actually experience.':'I shape visuals through editing, VFX, colour, generative AI and story — from the first frame to the final cut.'}</p>
            <div className="hero-actions">
              <a href="#work" className="cta">{mode==='engineer'?'EXPLORE AI / ML WORK':'ENTER THE REEL'} <span>↓</span></a>
            </div>
          </div>
          <div className="hero-portrait"><img src={portrait} alt="Rohit Meena"/><div className="portrait-mask"/><div className="scan-line"/><span className="reticle r1"/><span className="reticle r2"/><div className="portrait-label">ROHIT MEENA / 2026<br/><span>{mode==='engineer'?'AI / ML ENGINEER':'VFX / EDITOR'}</span></div></div>
          <div className="hero-readout"><span>SCROLL</span><b>SCRUB THE OPENING FILM</b><em>●</em></div>
        </div>
      </section>

      <section id="modes" className="scene modes-scene" data-scene>
        <div className="sticky modes-stage">
          <div className="mode-big">{mode==='engineer'?'SYSTEMS':'FRAMES'}</div>
          <div className="mode-heading"><p className="kicker">02 — TWO WORLDS / ONE PRACTICE</p><h2>Choose<br/>your <i>lens.</i></h2><p>Rohit Meena — AI / ML Engineer with a parallel visual practice in VFX, editing and generative media.</p></div>
          <div className="mode-switch">
            <button className={mode==='engineer'?'selected':''} onClick={()=>setMode('engineer')}><span>01</span><strong>AI / ML ENGINEER</strong><b>LLM · RAG · AGENTS · ML</b></button>
            <button className={mode==='creative'?'selected':''} onClick={()=>setMode('creative')}><span>02</span><strong>VFX / EDITOR</strong><b>EDIT · VFX · COLOR · AI VISUALS</b></button>
          </div>
          <div className="mode-conversion"><span>{mode==='engineer'?'SIGNAL':'FRAME'}</span><i>→</i><span>{mode==='engineer'?'SYSTEM':'STORY'}</span></div>
        </div>
      </section>

      {mode==='engineer'&&<section id="telemetry" className="scene telemetry-scene" data-scene>
        <div className="sticky telemetry-stage">
          <div className="telemetry-copy"><p className="kicker">03 — ENGINEERING TELEMETRY</p><h2>Work leaves<br/><i>signals.</i></h2><p>Only supported signals from real projects and experience.</p></div>
          <div className="telemetry-grid">{[['300+','AI-GENERATED VISUAL ASSETS','PHOTO GPT'],['10+','GENAI PLATFORMS','PHOTO GPT'],['10M+','CAMPAIGN VIEWS','INSTAGRAM + THREADS'],['99.12%','TEST ACCURACY','PYTORCH ANN']].map(([v,l,s],i)=><article key={l}><small>0{i+1}</small><strong>{v}</strong><span>{l}</span><em>{s}</em><i/></article>)}</div>
        </div>
      </section>}

      <section id="work" className="scene work-scene" data-scene>
        <div className="sticky work-stage">
          <div className="work-head"><p className="kicker">{mode==='engineer'?'04 — FEATURED AI / ML SYSTEMS':'03 — CREATIVE SYSTEMS'}</p><h2>Proof,<br/>in <i>motion.</i></h2><p>{mode==='engineer'?'Every project is visible. Click any one to enter its case-study film. Scroll changes the active system without hiding the others.':'A visual archive of the work that lives on the other side of the lens.'}</p></div>
          <div className="project-canvas">
            <div className="project-beam"/>
            <div className="project-grid-lines"/>
            {projects.map((project,i)=><ProjectCard key={project.id} project={project} index={i} offset={i-activeProjectIndex} onOpen={openProject} mode={mode}/>)}
            <div className="project-dots">{projects.map((p,i)=><button key={p.id} aria-label={`Focus ${p.name}`} className={i===activeProjectIndex?'active':''} onClick={()=>setSelectedProject(i)}/>)}</div>
          </div>
          <div className="work-progress"><span>01</span><div><i style={{width:`${Math.max(3,(activeProjectIndex/(Math.max(1,projects.length-1)))*100)}%`}}/></div><span>{String(projects.length).padStart(2,'0')}</span></div>
          <div className="work-instruction"><b>SCROLL</b><span>changes focus</span><b>CLICK</b><span>opens every project</span></div>
        </div>
      </section>

      <section id="stack" className="scene stack-scene" data-scene>
        <div className="sticky stack-stage">
          {mode==='engineer'?<>
            <div className="stack-heading"><p className="kicker">05 — ENGINEERING DNA</p><h2>Skills are<br/><i>systems.</i></h2><p>No fake percentages. Technologies connected to the work they power.</p></div>
            <div className="skill-field"><div className="skill-core"><span>ROHIT MEENA</span><b>AI / ML ENGINEER</b><small>BUILD → MEASURE → SHIP</small></div>
              {Object.entries(skills).map(([g,items],gi)=><div key={g} className={`skill-cluster cluster-${gi}`}><label>{g}</label>{items.map(s=><button key={s} onMouseEnter={()=>setSkill(s)} onFocus={()=>setSkill(s)} onMouseLeave={()=>setSkill(null)} onBlur={()=>setSkill(null)} className={skill===s?'hot':''}>{s}</button>)}</div>)}
              <div className={`skill-relations ${skill?'active':''}`}>{skill?<><span>{skill}</span><b>{skillLinks[skill]?.join(' · ')||'CONNECTED TO THE BUILD STACK'}</b></>:<><span>HOVER A SKILL</span><b>WATCH ITS PROJECTS LIGHT UP</b></>}</div>
            </div>
          </>:<>
            <div className="stack-heading"><p className="kicker">04 — CREATIVE TOOLKIT</p><h2>Frames need<br/><i>intent.</i></h2><p>Editing, VFX, colour, AI visuals and narrative as one workflow.</p></div>
            <div className="creative-toolkit"><div className="creative-core">VFX / EDITOR</div>{['EDIT','VFX','COLOR','AI VISUALS','STORY','IDENTITY'].map((x,i)=><div key={x} className="tool-orbit" style={{'--i':i}}>{x}</div>)}<div className="creative-caption">CUT → COMPOSE → GRADE → GENERATE → STORY</div></div>
          </>}
        </div>
      </section>

      <section id="experience" className="scene experience-scene" data-scene>
        <div className="sticky experience-stage">
          <div className="experience-title"><p className="kicker">{mode==='engineer'?'06 — EXPERIENCE / EDUCATION':'05 — CREATIVE HISTORY'}</p><h2>{mode==='engineer'?<>Build.<br/>Ship.<br/><i>Repeat.</i></>:<>Cut.<br/>Grade.<br/><i>Tell.</i></>}</h2></div>
          <div className="experience-timeline">
            {mode==='engineer'?<>
              <article className="exp-featured"><span>03 / 2026 — 06 / 2026</span><h3>PHOTO GPT / TAIC LLC</h3><p>GENERATIVE AI INTERN</p><strong>10+ PLATFORMS · 300+ VISUAL ASSETS · 10M+ CAMPAIGN VIEWS SUPPORTED</strong><em>Prompt engineering · model benchmarking · creative automation · image / video generation</em></article>
              <article><span>2024 — 2028</span><h3>IIIT BHOPAL</h3><p>B.TECH / CSE — ARTIFICIAL INTELLIGENCE</p><strong>DEEP LEARNING · TRANSFORMERS · GPT · GENAI · AGENTIC AI · RAG · DSA · OOP · DBMS · OS · NETWORKS</strong></article>
            </>:<>
              <article className="exp-featured"><span>03 / 2026 — 06 / 2026</span><h3>PHOTO GPT / TAIC LLC</h3><p>GENERATIVE AI / CREATIVE PRODUCTION</p><strong>AI IMAGE · AI VIDEO · PROMPTING · MODEL BENCHMARKING</strong></article>
              <article><span>04 / 2025</span><h3>NIIMACK FEST</h3><p>CREATIVE LEAD — DOCUMENTARY</p><strong>VFX · COLOR GRADING · VIDEO EDITING · NARRATIVE STORYTELLING</strong></article>
              <article><span>08 / 2025</span><h3>PODYSSEY</h3><p>CORE MEMBER</p><strong>CONTENT CREATION · COMMUNITY · GENAI</strong></article>
            </>}
          </div>
          <div className="education-strip"><span>INDIAN INSTITUTE OF INFORMATION TECHNOLOGY, BHOPAL</span><b>AI / ML ENGINEERING</b><em>2024 — 2028</em></div>
        </div>
      </section>

      {mode==='engineer'&&<section id="signals" className="scene signals-scene" data-scene>
        <div className="sticky signals-stage">
          <div className="signals-copy"><p className="kicker">07 — ENGINEERING SIGNALS</p><h2>Proof outside<br/><i>the page.</i></h2><p>Public repositories, algorithms and the profile behind the work.</p><div className="profile-line"><span>github.com/Rohit-Seera</span><span>CURRENTLY: BUILDING MISTELLA · DEEPENING LLM SYSTEMS + AGENTIC ARCHITECTURES</span><span>OPEN TO: AI / ML INTERNSHIPS · GENAI ROLES · RESEARCH · OPEN SOURCE</span></div></div>
          <div className="signals-grid">
            {repoSignals.map(([name,desc,status,url],i)=><a href={url} target="_blank" rel="noreferrer" className="signal-card" key={name}><span>{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><small>{desc}</small><b>{status} ↗</b></a>)}
            <div className="signal-card signal-note"><span>07</span><strong>ALUMNI RECONNECT</strong><small>DESIGNED THE OFFICIAL LOGO FOR IIIT BHOPAL'S ALUMNI RECONNECT CELL.</small><b>VISUAL IDENTITY</b></div>
            <div className="signal-card signal-note"><span>08</span><strong>HACK-O-SPRINT</strong><small>BUILT A WEB-BASED TEAM DEMO AT THE IIIT BHOPAL INTERNAL HACKATHON.</small><b>PROBLEM SOLVING · TEAMWORK</b></div>
          </div>
        </div>
      </section>}

      <section id="contact" className="scene contact-scene" data-scene>
        <div className="sticky contact-stage">
          <div className="contact-signal"><span/><span/><span/><span/></div>
          <p className="kicker">{mode==='engineer'?'08 — TRANSMISSION':'06 — NEXT FRAME'}</p>
          <h2>{mode==='engineer'?<>Have a system<br/>worth <i>building?</i></>:<>Have a story<br/>worth <i>cutting?</i></>}</h2>
          <p className="contact-copy">Rohit Meena — AI / ML Engineer building intelligent systems, with a visual practice in VFX, editing and generative media.</p>
          <div className="contact-actions"><a href="mailto:rrrohitmeena@gmail.com">SEND MESSAGE ↗</a><a href="https://github.com/Rohit-Seera" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/rohit-meena-8babba324" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://codeforces.com/profile/Rohit_seera" target="_blank" rel="noreferrer">CODEFORCES ↗</a><a href={resume} download>RESUME ↓</a></div>
          <footer><span>ROHIT MEENA / INDIA</span><span>rrrohitmeena@gmail.com</span><span>AI / ML ENGINEER</span></footer>
        </div>
      </section>
    </main>

    {detail&&<div className={`cinematic-overlay ${detail.film===VfxFilm?'creative-film':''}`} role="dialog" aria-modal="true" aria-label={`${detail.name} case study`}>
      <div className="overlay-vignette"/>
      <button className="overlay-close" onClick={closeProject} aria-label="Close project case study"><span>CLOSE</span><b>×</b></button>
      <div className="overlay-meta"><span>{detail.no} / {detail.type}</span><b>{String(Math.round(detailProgress*100)).padStart(2,'0')}%</b></div>
      <div className="overlay-progress"><i style={{width:`${detailProgress*100}%`}}/></div>
      <div className="overlay-arrow overlay-left">‹</div><div className="overlay-arrow overlay-right">›</div>
      {detail.film ? (
        <div className="detail-film-shell">
          <div className="detail-film-fallback">
            <span>{detail.name}</span>
            <b>{detail.film===ProtoBuyFilm ? 'AGENT → GUARDRAIL → DECISION → AUDIT' : 'SCROLL TO SCRUB CASE STUDY'}</b>
          </div>
          <FilmPlayer Component={detail.film} playerRef={detailPlayerRef} progress={detailProgress} duration={detail.film===VfxFilm?300:360} className="detail-player"/>
        </div>
      ) : <MLFilm project={detail} progress={detailProgress}/>}
      <div className="overlay-side"><p className="kicker">{detail.no} — CASE STUDY / SCROLL TO SCRUB</p><strong>{detail.metric}</strong><span>{detail.stack}</span></div>
      <div className="overlay-copy">
        <h2>{detail.name}</h2>
        <p>{detail.detail||detail.desc}</p>
        {detail.liveUrl && <a className="overlay-live" href={detail.liveUrl} target="_blank" rel="noreferrer">OPEN LIVE SYSTEM ↗</a>}
      </div>
      <div className="overlay-hint"><span>↕</span><b>SCRUB FILM</b><em>ESC CLOSE</em></div>
    </div>}
  </div>
}
export default App;
