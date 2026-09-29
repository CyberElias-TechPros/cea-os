import React from 'react';

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*.+?\*\*|\*[^*]+?\*|`[^`]+?`|\[.+?\]\(.+?\)|!\[.*?\]\(.+?\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith('**')) parts.push(<strong key={`${keyPrefix}-${k++}`}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith('![')) {
      const im = t.match(/^!\[(.*?)\]\((.+?)\)$/);
      if (im) parts.push(<img key={`${keyPrefix}-${k++}`} src={im[2]} alt={im[1]} className="rounded-lg border my-4 max-w-full" loading="lazy" />);
      else parts.push(t);
    } else if (t.startsWith('[')) {
      const lm = t.match(/^\[(.+?)\]\((.+?)\)$/);
      if (lm) parts.push(<a key={`${keyPrefix}-${k++}`} href={lm[2]} className="text-primary underline underline-offset-4 hover:opacity-80">{lm[1]}</a>);
      else parts.push(t);
    } else if (t.startsWith('*')) parts.push(<em key={`${keyPrefix}-${k++}`}>{t.slice(1, -1)}</em>);
    else if (t.startsWith('`')) parts.push(<code key={`${keyPrefix}-${k++}`} className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]">{t.slice(1, -1)}</code>);
    last = m.index + t.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Markdown({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/);
  const out: React.ReactNode[] = [];
  let i = 0;
  let listBuf: { ordered: boolean; items: string[] } | null = null;
  const flushList = () => {
    if (!listBuf) return;
    const { ordered, items } = listBuf;
    listBuf = null;
    out.push(
      ordered ? (
        <ol key={`b-${i++}`} className="my-4 space-y-2 list-decimal pl-6">
          {items.map((it, j) => <li key={j} className="leading-relaxed">{renderInline(it, `li-${i}-${j}`)}</li>)}
        </ol>
      ) : (
        <ul key={`b-${i++}`} className="my-4 space-y-2 list-disc pl-6">
          {items.map((it, j) => <li key={j} className="leading-relaxed">{renderInline(it, `li-${i}-${j}`)}</li>)}
        </ul>
      ),
    );
  };
  for (const raw of blocks) {
    const b = raw.trim();
    if (!b) continue;
    const lm = b.match(/^(- |\d+\. )([\s\S]+)$/);
    if (lm) {
      const ordered = lm[1] !== '- ';
      const item = b.replace(/^(- |\d+\. )/,'');
      if (!listBuf || listBuf.ordered !== ordered) { flushList(); listBuf = { ordered, items: [] }; }
      listBuf.items.push(item);
      continue;
    }
    flushList();
    if (b.startsWith('```')) {
      const code = b.replace(/^```\n?/, '').replace(/\n?```$/, '');
      out.push(<pre key={`b-${i++}`} className="my-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm"><code>{code}</code></pre>);
    } else if (b.startsWith('### ')) {
      out.push(<h3 key={`b-${i++}`} className="mt-8 text-xl font-bold tracking-tight">{renderInline(b.slice(4), `h-${i}`)}</h3>);
    } else if (b.startsWith('## ')) {
      out.push(<h2 key={`b-${i++}`} className="mt-10 text-2xl font-bold tracking-tight">{renderInline(b.slice(3), `h-${i}`)}</h2>);
    } else if (b.startsWith('# ')) {
      out.push(<h2 key={`b-${i++}`} className="mt-10 text-2xl font-bold tracking-tight">{renderInline(b.slice(2), `h-${i}`)}</h2>);
    } else if (b.startsWith('> ')) {
      out.push(<blockquote key={`b-${i++}`} className="my-4 border-l-4 border-primary/40 pl-4 italic text-muted-foreground">{renderInline(b.replace(/^> /gm, ''), `q-${i}`)}</blockquote>);
    } else if (/^\|.*\|$/.test(b.split('\n')[0] ?? '')) {
      const rows = b.split('\n').filter((r) => r.trim().startsWith('|')).map((r) => r.trim().split('|').slice(1, -1).map((c) => c.trim()));
      const hasSep = (rows[1] ?? []).every((c) => /^-+$/.test(c));
      const head = hasSep ? rows[0] : [];
      const data = hasSep ? rows.slice(2) : rows.slice(1);
      out.push(
        <div key={`b-${i++}`} className="my-4 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            {head.length > 0 && <thead><tr className="bg-muted">{head.map((c, j) => <th key={j} className="px-3 py-2 text-left font-semibold">{c}</th>)}</tr></thead>}
            <tbody>{data.map((r, ri) => <tr key={ri} className="border-t">{r.map((c, j) => <td key={j} className="px-3 py-2 align-top">{renderInline(c, `t-${i}-${ri}-${j}`)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
    } else if (/^!\[.*?\]\(.+?\)$/.test(b)) {
      out.push(<p key={`b-${i++}`} className="my-4">{renderInline(b, `img-${i}`)}</p>);
    } else if (/^\*.+\*$/.test(b) && b.length < 300) {
      out.push(<p key={`b-${i++}`} className="my-4 text-sm italic text-muted-foreground">{renderInline(b.slice(1, -1), `cap-${i}`)}</p>);
    } else {
      out.push(<p key={`b-${i++}`} className="my-4 text-[17px] leading-[1.75] text-foreground/85">{renderInline(b, `p-${i}`)}</p>);
    }
  }
  flushList();
  return <>{out}</>;
}
