'use client';

import styles from './PageVisual.module.css';
import Image from 'next/image';
import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';
import { stats } from '@/lib/resultsContent';

const blue = '#83baff';
const pale = '#d8e9ff';
const red = '#ff7b83';
const captions = {
  about: 'Связи между бизнесом, наукой, образованием и государством',
  directions: 'Технологии ИИ соединяют шесть направлений работы',
  projects: 'От задачи и прототипа — к внедрению решения',
  results: 'Масштаб работы Федерации в цифрах',
  news: 'События, знания и новые связи',
  partnership: 'Экспертиза и ресурсы объединяются в совместный проект',
  president: 'Практический опыт на пересечении трёх сфер',
  contacts: 'Обращение попадает к команде по теме вашего вопроса',
  privacy: 'Данные используются для рассмотрения обращения',
  consent: 'Вы управляете согласием на обработку данных',
};
function Label({ x, y, children, color = pale, size = 18 }) {
  return <text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} fontWeight="500">{children}</text>;
}
function Node({ x, y, text, accent = false, width = 136, phase = 0 }) {
  return <g className="viz-node" style={{ '--phase': `${phase}s` }}><rect x={x-width/2} y={y-23} width={width} height="46" rx="14" fill={accent ? '#193e68' : '#112238'} stroke={accent ? blue : '#36516e'} /><Label x={x} y={y+6}>{text}</Label></g>;
}
function Line({ d, accent = false }) {
  return <g fill="none">
    <path d={d} stroke={accent ? red : blue} strokeWidth="1.5" strokeDasharray="5 7" opacity=".35" />
    <path className="viz-signal" d={d} pathLength="100" stroke={accent ? red : '#c0f6ff'} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 94" />
  </g>;
}
const energyMaps = {
  directions: { glow: [500, 466, 125, 125], paths: ['M500 466 L500 150', 'M500 466 L815 315', 'M500 466 L815 630', 'M500 466 L500 785', 'M500 466 L185 630', 'M500 466 L185 315'] },
  results: { glow: [605, 540, 165, 200], paths: ['M235 790 L235 610', 'M355 790 L355 505', 'M480 790 L480 400', 'M610 790 L610 275', 'M760 785 L760 125'] },
  news: { glow: [470, 370, 130, 120], paths: ['M350 245 Q425 230 460 260 L560 260 L650 265 L760 292', 'M350 245 L450 370 L520 330 L615 327', 'M325 480 L355 440 L450 400 L495 515 L655 535', 'M390 563 L445 612 L495 515 L540 505 L655 535'] },
  brain: { glow: [490, 450, 300, 240], paths: ['M145 490 Q235 335 370 355 T610 235 Q700 230 800 350', 'M215 580 Q330 530 365 405 T505 235', 'M340 670 Q465 610 520 470 T700 330 Q785 340 835 470', 'M520 735 Q570 600 715 575 T850 470'] },
  architecture: { glow: [495, 302, 150, 72], paths: ['M330 205 L330 270 L405 300 L405 365', 'M450 180 L450 265 L530 300 L530 385', 'M650 180 L650 260 L580 300 L580 360', 'M730 215 L730 290 L650 320 L650 385'] },
  partnership: { glow: [475, 147, 92, 95], paths: ['M405 170 Q400 100 455 80 T530 120 Q565 160 520 190', 'M420 145 Q465 110 490 150 T535 165', 'M140 430 L220 480 L295 510 L355 560', 'M850 430 L775 490 L700 535 L650 575'] },
};
function InternalEnergy({ artwork }) {
  const { glow: [cx, cy, rx, ry], paths } = energyMaps[artwork];
  return <svg className={styles.internalEnergy} viewBox="0 0 1000 1000" aria-hidden="true">
    <ellipse className={styles.coreGlow} cx={cx} cy={cy} rx={rx} ry={ry} fill="#00cfff" />
    <g fill="none" stroke="#b6faff" strokeLinecap="round">
      {paths.map((d, i) => <path key={d} className={styles.internalSignal} d={d} pathLength="100" strokeWidth="3" style={{ animationDelay: `${i * -.8}s` }} />)}
    </g>
    {paths.map((d, i) => {
      const [x, y] = d.slice(1).split(/[ QLT]/).map(Number);
      return <circle key={d} className={styles.coreNode} cx={x} cy={y} r="5" fill="#d9ffff" style={{ animationDelay: `${i * -.6}s` }} />;
    })}
  </svg>;
}
function Brain() {
  return <g fill="none" stroke={blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M203 106 C183 90 162 109 165 125 C146 134 151 155 162 162 C156 185 180 199 199 184 M217 106 C237 90 258 109 255 125 C274 134 269 155 258 162 C264 185 240 199 221 184 M210 105 V190 M175 120 L191 132 L177 150 L195 168 M244 121 L229 135 L245 154 L225 170 M191 132 L210 143 L229 135 M195 168 L210 157 L225 170" />
    {[[175,120],[191,132],[177,150],[195,168],[244,121],[229,135],[245,154],[225,170],[210,143]].map(([x,y],i)=><circle className="viz-synapse" style={{ animationDelay: `${i * -.35}s` }} key={i} cx={x} cy={y} r="3" fill={i%3===0?red:blue} stroke="none" />)}
  </g>;
}
export default function PageVisual({ variant }) {
  const figureRef = useRef(null);
  const visible = useInView(figureRef, { margin: '60px' });
  const reduce = useReducedMotion();
  const caption = captions[variant];
  if (!caption) return null;
  const artwork = { about: 'brain', directions: 'directions', projects: 'architecture', results: 'results', news: 'news', president: 'architecture', partnership: 'partnership', contacts: 'partnership' }[variant];
  if (artwork) return <Box component="figure" ref={figureRef} className={styles.root} data-running={visible && !reduce ? 'true' : 'false'} sx={{ m: 0, width: '100%', maxWidth: 520, mx: 'auto', minWidth: 0 }}>
    <div className={styles.scene}>
      <div className={styles.halo} aria-hidden="true" />
      <Image className={styles.artwork} src={`/visuals/neural-${artwork}.png`} alt={caption} width={1254} height={1254} sizes="(max-width: 899px) 90vw, 520px" preload />
      <InternalEnergy artwork={artwork} />
    </div>
    <Box component="figcaption" sx={{ color: '#a5bfd8', fontSize: 13, textAlign: 'center', mt: 1 }}>{caption}</Box>
  </Box>;
  const network = ['about', 'directions', 'president'].includes(variant);
  const labels = variant === 'about' ? ['Бизнес','Наука','Образование','Государство'] : variant === 'president' ? ['Бизнес','Технологии','Образование','Практика'] : ['Внедрение','Наука','Кадры','Регулирование'];
  return <Box component="figure" ref={figureRef} className={`${styles.root} page-visual visual-${variant}`} data-running={visible && !reduce ? 'true' : 'false'} sx={{ m: 0, width: '100%', maxWidth: 440, mx: 'auto', minWidth: 0 }}>
    <svg viewBox="0 0 420 310" role="img" aria-label={caption} style={{ display: 'block', width: '100%', height: 'auto', fontFamily: 'inherit' }}>
      <defs><radialGradient id={`visual-glow-${variant}`}><stop stopColor="#388bdd" stopOpacity=".2" /><stop offset="1" stopColor="#388bdd" stopOpacity="0" /></radialGradient></defs>
      <circle className="viz-aura" cx="210" cy="150" r="148" fill={`url(#visual-glow-${variant})`} />
      <g fill="#89baff" opacity=".16">{Array.from({length: 42},(_,i)=><circle key={i} cx={30+(i%7)*60} cy={25+Math.floor(i/7)*50} r="1" />)}</g>
      {network && <>
        <circle cx="210" cy="150" r="67" fill="#102339" stroke="#355d86" />
        <circle cx="210" cy="150" r="80" fill="none" stroke="#345878" strokeDasharray="2 9" />
        <g className="viz-orbit" style={{ transformOrigin: '210px 150px' }}>
          <circle cx="210" cy="150" r="80" fill="none" stroke={blue} strokeWidth="2" strokeDasharray="80 423" />
          <circle cx="290" cy="150" r="4" fill="#d2ffff" />
        </g>
        <g className="viz-orbit viz-orbit-reverse" style={{ transformOrigin: '210px 150px' }}>
          <circle cx="210" cy="150" r="91" fill="none" stroke={red} strokeWidth="1.5" strokeDasharray="34 538" opacity=".7" />
        </g>
        <Line d="M100 55 L170 94 M320 55 L250 94 M100 245 L170 206 M320 245 L250 206 M92 78 V222 M328 78 V222" />
        <Brain />
        <Node x={91} y={53} text={labels[0]} /><Node phase={-1.5} x={329} y={53} text={labels[1]} />
        <Node phase={-3} x={91} y={247} text={labels[2]} /><Node phase={-4.5} x={329} y={247} text={labels[3]} />
        {variant === 'directions' && <><Label x={210} y={24} size={14}>Взаимодействие отрасли</Label><Label x={210} y={300} size={14}>Связи между регионами</Label></>}
      </>}
      {variant === 'projects' && <>
        <Line d="M94 83 H318 V224 H98" />
        <path d="M200 78 L207 83 L200 88 M313 150 L318 157 L323 150 M211 219 L204 224 L211 229" stroke={blue} fill="none" strokeWidth="2" />
        <Node x={106} y={72} text="Задача" accent /><Node phase={-4.5} x={310} y={72} text="Прототип" />
        <Node phase={-3} x={310} y={236} text="Проверка" /><Node phase={-1.5} x={106} y={236} text="Внедрение" accent />
        <g transform="translate(158 113)" fill="none" stroke={blue} strokeWidth="2"><rect width="104" height="67" rx="10" fill="#102339" /><path d="M0 17 H104 M36 31 L25 41 L36 51 M68 31 L79 41 L68 51 M57 28 L48 55 M40 68 V79 H68 V68" /><circle className="viz-synapse" cx="10" cy="9" r="2" fill={red} /></g>
      </>}
      {variant === 'results' && <>
        {stats.map((s,i)=><g key={s.label} transform={`translate(${i%2*200+12} ${Math.floor(i/2)*137+17})`}>
          <rect className="viz-metric" style={{ animationDelay: `${i * -1.5}s` }} width="196" height="123" rx="20" fill="#12253c" stroke="#34526e" />
          <text x="18" y="57" fill={i===3?red:blue} fontSize={i===3?35:43} fontWeight="700">{s.value}</text>
          <text x="18" y="86" fill={pale} fontSize="18">{['мероприятий', 'городов', 'публикаций', 'учеников'][i]}</text>
          <text x="18" y="108" fill="#afc3da" fontSize="15">{['', 'и площадок', 'в СМИ', 'Лаборатория ИИ с АШК'][i]}</text>
        </g>)}
      </>}
      {variant === 'news' && <>
        <g transform="translate(84 40) rotate(-8 130 105)"><rect width="260" height="206" rx="20" fill="#142c48" stroke="#345677" /></g>
        <rect x="65" y="54" width="276" height="201" rx="20" fill="#101f33" stroke="#699cd0" />
        <rect x="84" y="74" width="237" height="85" rx="12" fill="#1b4167" />
        <path className="viz-trace" pathLength="100" d="M104 130 L149 98 L188 132 L232 92 L300 136" fill="none" stroke={blue} strokeWidth="2" />
        {[104,149,188,232,300].map((x,i)=><circle className="viz-synapse" style={{ animationDelay: `${i * -.6}s` }} key={x} cx={x} cy={[130,98,132,92,136][i]} r="5" fill={i===3?red:blue} />)}
        <Label x={202} y={193}>События → опыт → связи</Label>
        <path d="M96 217 H229 M96 230 H284" stroke="#466888" strokeWidth="3" strokeLinecap="round" />
      </>}
      {variant === 'partnership' && <>
        <circle className="viz-partner-left" cx="156" cy="132" r="85" fill="#20548c" fillOpacity=".25" stroke={blue} /><circle className="viz-partner-right" cx="266" cy="132" r="85" fill="#67404d" fillOpacity=".2" stroke={red} />
        <Label x={132} y={129}>Экспертиза</Label><Label x={291} y={148}>Ресурсы</Label>
        <path className="viz-check" pathLength="100" d="M196 133 L206 143 L225 119" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <Line d="M210 206 V245" /><Node x={210} y={268} text="Совместный проект" width={220} accent />
      </>}
      {variant === 'contacts' && <>
        <rect x="29" y="53" width="157" height="108" rx="20" fill="#153556" stroke={blue} />
        <path className="viz-trace" pathLength="100" d="M54 85 H158 M54 104 H137 M54 124 H112 M64 161 L64 181 L90 161" stroke={blue} fill="none" strokeWidth="2" />
        <Line d="M190 106 H246 V190" />
        <Node x={277} y={220} text="Команда" width={155} accent />
        <circle cx="278" cy="167" r="16" fill="#18314d" stroke={red} /><path d="M251 204 Q252 179 278 183 Q304 180 305 204" fill="none" stroke={red} strokeWidth="2" />
        <Label x={108} y={213}>Ваш вопрос</Label><Label x={211} y={293} size={14}>Обратная связь по существу</Label>
      </>}
      {['privacy','consent'].includes(variant) && <>
        <path className="viz-shield" d="M210 35 L292 65 V137 Q291 200 210 237 Q129 200 128 137 V65 Z" fill="#143455" stroke={blue} strokeWidth="2" />
        {variant === 'privacy' ? <g stroke={pale} strokeWidth="3" fill="none"><rect x="180" y="112" width="60" height="52" rx="10" /><path d="M191 111 V95 a19 19 0 0 1 38 0 V111" /><circle cx="210" cy="136" r="4" /><path d="M210 140 V149" /></g> : <path className="viz-check" pathLength="100" d="M174 130 L199 155 L246 103" fill="none" stroke={pale} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />}
        <Label x={210} y={273}>{variant==='privacy'?'Обращение · ответ · удаление':'Ознакомиться · согласиться'}</Label>
        {variant==='consent' && <Label x={210} y={300} size={14}>Согласие можно отозвать</Label>}
      </>}
    </svg>
    <Box component="figcaption" sx={{ color: '#a8bed5', textAlign: 'center', fontSize: '.78rem', lineHeight: 1.5, mt: 1, maxWidth: '40ch', mx: 'auto' }}>{caption}</Box>
  </Box>;
}
