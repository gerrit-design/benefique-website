import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LINES, LINE_PATH, LINE_NAME, LINE_POSTS, stopFor, postsAtStop } from '../data/referral-line';

// Line colours: operations = brand navy, financial = brand orange.
const LINE_COLOR = { ops: '#1B365D', fin: '#F97316' };

const LEDE =
  'Scheduling, the front desk, the billing company and the bank each run their own stop, scored on their own ' +
  'number. Every stop can hit its number while the business loses money between them. We tie the operations ' +
  'data to the ledger and follow every patient from the referrer to the bank.';

// ---------------------------------------------------------------------------
// LineStrip — the "where this article sits" strip shown on each radiology post.
// Renders nothing for posts that are not on the line.
// ---------------------------------------------------------------------------
export function LineStrip({ slug }) {
  const entry = LINE_POSTS[slug];
  if (!entry) return null;
  const here = stopFor(entry.stop);
  const also = entry.also ? stopFor(entry.also) : null;
  if (!here) return null;

  return (
    <aside
      aria-label={`Where this article sits on the ${LINE_NAME}`}
      className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          On the {LINE_NAME}
        </p>
        <Link
          to={`${LINE_PATH}#${here.code}`}
          className="text-sm font-semibold text-benefique-orange hover:underline"
        >
          See the whole line &rarr;
        </Link>
      </div>

      <div className="space-y-2" aria-hidden="true">
        {LINES.map((line) => (
          <div key={line.key} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              {line.key === 'ops' ? 'Ops' : 'Financial'}
            </span>
            <div className="relative flex flex-1 items-center justify-between">
              <div
                className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded"
                style={{ background: LINE_COLOR[line.key], opacity: here.line.key === line.key ? 1 : 0.35 }}
              />
              {line.stops.map((s) => {
                const isHere = s.code === here.code;
                const isAlso = also && s.code === also.code;
                return (
                  <span
                    key={s.code}
                    title={s.name}
                    className="relative z-10 block rounded-full bg-white"
                    style={{
                      width: isHere ? 18 : 10,
                      height: isHere ? 18 : 10,
                      border: `${isHere ? 5 : 2}px ${isAlso ? 'dashed' : 'solid'} ${LINE_COLOR[line.key]}`,
                      opacity: isHere || isAlso || here.line.key === line.key ? 1 : 0.5,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-700">
        This article is about{' '}
        <Link to={`${LINE_PATH}#${here.code}`} className="font-semibold text-benefique-navy hover:underline">
          {here.code} {here.name}
        </Link>{' '}
        on the {here.line.name.toLowerCase()}
        {also && (
          <>
            , and also touches{' '}
            <Link to={`${LINE_PATH}#${also.code}`} className="font-semibold text-benefique-navy hover:underline">
              {also.code} {also.name}
            </Link>
          </>
        )}
        .
      </p>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// LineTrack — the picture: one line, its stops as stations. Each station links
// to its stop card (`hrefFor(code)`). Names show from md up; phones get codes.
// ---------------------------------------------------------------------------
function LineTrack({ line, hrefFor }) {
  const color = LINE_COLOR[line.key];
  return (
    <ol className="grid grid-flow-col auto-cols-fr mb-8" aria-label={`${line.name} stops`}>
      {line.stops.map((stop, si) => {
        const first = si === 0;
        const last = si === line.stops.length - 1;
        return (
          <li key={stop.code} className="relative pr-1">
            <span
              aria-hidden="true"
              className={`absolute top-[11px] h-1.5 ${first ? 'left-3' : 'left-0'} ${last ? 'w-3' : 'right-0'}`}
              style={{ background: color }}
            />
            <a href={hrefFor(stop.code)} className="group relative block">
              <span
                aria-hidden="true"
                className="block h-7 w-7 rounded-full bg-white transition-transform group-hover:scale-110"
                style={{ border: `5px solid ${color}` }}
              />
              <span className="mt-2 block text-[11px] font-semibold tracking-wider text-gray-400">{stop.code}</span>
              <span className="hidden md:block text-sm font-bold uppercase leading-tight text-benefique-navy group-hover:text-benefique-orange">
                {stop.name}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

// ---------------------------------------------------------------------------
// StopCard — the four answers for one stop. `children` is the article area.
// ---------------------------------------------------------------------------
function StopCard({ stop, lineKey, children }) {
  const color = LINE_COLOR[lineKey];
  return (
    <article
      id={stop.code}
      className="scroll-mt-24 flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      style={{ borderTop: `5px solid ${color}` }}
    >
      <p className="text-[11px] font-semibold tracking-wider text-gray-400">{stop.code}</p>
      <h4 className="text-lg font-bold uppercase leading-tight text-benefique-navy mb-3">{stop.name}</h4>
      <dl className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1 text-sm mb-3">
        <dt className="text-gray-500">Owner</dt>
        <dd className="text-gray-800 font-medium">{stop.owner}</dd>
        <dt className="text-gray-500">Scored on</dt>
        <dd className="text-gray-800 font-medium">{stop.scored}</dd>
      </dl>
      <div className="rounded-lg bg-gray-50 border-l-4 px-3 py-2 mb-3" style={{ borderColor: color }}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">What the score misses</p>
        <p className="text-sm text-gray-800 leading-snug">{stop.misses}</p>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">What we measure</p>
      <p className="text-sm font-semibold text-benefique-navy leading-snug">{stop.measure}</p>
      {children && <div className="mt-auto pt-4">{children}</div>}
    </article>
  );
}

const gridFor = (line) =>
  `grid gap-4 sm:grid-cols-2 ${line.stops.length > 6 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`;

function LineHeading({ line }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-5">
      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide" style={{ color: LINE_COLOR[line.key] }}>
        {line.name}
      </h3>
      <span className="text-sm text-gray-500">{line.route}</span>
    </div>
  );
}

const HANDOFF = 'Read & sign hands the study to Charge & claim. The patient continues on the financial line.';

// ---------------------------------------------------------------------------
// LineOverview — the whole line with its four answers, at the top of /radiology.
// ---------------------------------------------------------------------------
export function LineOverview() {
  const total = Object.keys(LINE_POSTS).length;

  return (
    <section id="line" aria-labelledby="line-heading" className="py-12 md:py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-benefique-orange mb-2">The {LINE_NAME}</p>
        <h2 id="line-heading" className="text-3xl md:text-4xl font-bold text-benefique-navy leading-tight mb-3">
          Every stop hits its number. The business still loses money.
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">{LEDE}</p>

        <div className="space-y-12">
          {LINES.map((line) => (
            <div key={line.key}>
              <LineHeading line={line} />
              <LineTrack line={line} hrefFor={(code) => `#${code}`} />
              <div className={gridFor(line)}>
                {line.stops.map((stop) => {
                  const count = postsAtStop(stop.code).length;
                  return (
                    <StopCard key={stop.code} stop={stop} lineKey={line.key}>
                      {count > 0 && (
                        <Link
                          to={`${LINE_PATH}#${stop.code}`}
                          className="text-sm font-semibold hover:underline"
                          style={{ color: LINE_COLOR[line.key] }}
                        >
                          {count} article{count === 1 ? '' : 's'} on this stop &rarr;
                        </Link>
                      )}
                    </StopCard>
                  );
                })}
              </div>
              {line.key === 'ops' && <p className="mt-6 text-sm text-gray-500">{HANDOFF}</p>}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to={LINE_PATH}
            className="bg-benefique-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2D4A6F] transition"
          >
            Read the {total} articles, stop by stop &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// ReferralLinePage — /radiology/line. The same stops, with every radiology
// article listed under the stop it is about. `posts` is the blogPosts registry.
// ---------------------------------------------------------------------------
export function ReferralLinePage({ posts }) {
  const total = Object.keys(LINE_POSTS).length;

  return (
    <>
      <Helmet>
        <title>{`The ${LINE_NAME} | Imaging Center Data Analytics | Benefique`}</title>
        <meta
          name="description"
          content="Every imaging patient travels one line, from referrer to cash to enterprise value. Who owns each stop, what they are scored on, what that score misses, and what we measure instead."
        />
        <link rel="canonical" href={`https://www.benefique.com${LINE_PATH}`} />
      </Helmet>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-benefique-orange transition">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/radiology" className="hover:text-benefique-orange transition">Radiology</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">The {LINE_NAME}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-benefique-orange mb-3">
            Imaging center data analytics
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-5">The {LINE_NAME}</h1>
          <div className="max-w-3xl space-y-4 text-lg text-gray-600">
            <p>
              Every patient an imaging center sees travels one line. A referring provider sends the patient. The
              patient is scheduled, verified, shows up, is scanned and read. The study becomes a claim, the claim
              becomes cash, and the cash becomes margin, owner pay and enterprise value.
            </p>
            <p>{LEDE}</p>
            <p>
              Each stop below names who owns it, what they are scored on, what that score misses, and what we
              measure instead, followed by our articles about that stop.
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-500">{total} articles on the line</p>
        </div>
      </section>

      {LINES.map((line, i) => (
        <section key={line.key} className={`py-12 ${i === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <LineHeading line={line} />
            <LineTrack line={line} hrefFor={(code) => `#${code}`} />
            <div className={gridFor(line)}>
              {line.stops.map((stop) => {
                const slugs = postsAtStop(stop.code).filter((s) => posts[s]);
                return (
                  <StopCard key={stop.code} stop={stop} lineKey={line.key}>
                    {slugs.length > 0 && (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Articles</p>
                        <ul className="space-y-2">
                          {slugs.map((slug) => {
                            const alsoStop = LINE_POSTS[slug].also ? stopFor(LINE_POSTS[slug].also) : null;
                            return (
                              <li key={slug}>
                                <Link
                                  to={`/blog/${slug}`}
                                  className="block rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold leading-snug text-gray-800 break-words hover:border-benefique-orange hover:text-benefique-navy transition"
                                >
                                  {posts[slug].title}
                                  {alsoStop && (
                                    <span className="block mt-1 text-xs font-normal text-gray-500">
                                      Also: {alsoStop.code} {alsoStop.name}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </StopCard>
                );
              })}
            </div>
            {line.key === 'ops' && <p className="mt-6 text-sm text-gray-500">{HANDOFF}</p>}
          </div>
        </section>
      ))}

      <section className="py-12 bg-benefique-navy text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Which stop is costing you?</h2>
            <p className="text-blue-100">
              We read your scheduling, billing and bank data together and show you the stop where dollars go missing.
            </p>
          </div>
          <Link
            to="/radiology"
            className="inline-block bg-benefique-orange text-white font-semibold px-6 py-3 rounded-lg whitespace-nowrap hover:bg-orange-600 transition"
          >
            Radiology CFO Intelligence &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
