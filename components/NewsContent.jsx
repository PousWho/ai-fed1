import { Box, Typography } from '@mui/material';

function inline(text) {
  return text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
    return match ? <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer">{match[1]}</a> : part;
  });
}

export default function NewsContent({ content }) {
  return <Box component="article" sx={{ lineHeight: 1.8, fontSize: '1.05rem', overflowWrap: 'anywhere', '& > *': { mb: 2 } }}>
    {content.split(/\n\s*\n/).map((block, index) => {
      const heading = block.match(/^(#{1,3})\s+(.+)$/);
      if (heading) return <Typography key={index} component={`h${heading[1].length + 1}`} sx={{ fontSize: `${1.6 - heading[1].length * .16}rem`, fontWeight: 700, mt: 4 }}>{inline(heading[2])}</Typography>;
      const lines = block.split('\n');
      if (lines.every((line) => /^\s*[-*]\s+/.test(line))) return <Box component="ul" key={index} sx={{ pl: 3 }}>{lines.map((line, i) => <li key={i}>{inline(line.replace(/^\s*[-*]\s+/, ''))}</li>)}</Box>;
      return <Typography component="p" key={index} sx={{ whiteSpace: 'pre-wrap', lineHeight: 'inherit' }}>{inline(block)}</Typography>;
    })}
  </Box>;
}
