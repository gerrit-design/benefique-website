import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LINES, LINE_PATH, LINE_POSTS, stopFor, postsAtStop } from '../data/referral-line';

// Line colours: operations = brand navy, financial = brand orange.
const LINE_COLOR = { ops: '#1B365D', fin: '#F97316' };

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
      aria-label="Where this article sits on the Referral-to-Cash Line"
      className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          On the Referral-to-Cash Line
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
          {here.line.name}: {here.name}
        </Link>
        {also && (
          <>
            , and also touches{' '}
            <Link to={`${LINE_PATH}#${also.code}`} className="font-semibold text-benefique-navy hover:underline">
              {also.name}
            </Link>
          </>
        )}
        .
      </p>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// ReferralLinePage — /radiology/line. Every radiology article, hung off the
// stop it is about. `posts` is the blogPosts registry from BlogPost.jsx.
// ---------------------------------------------------------------------------
export function ReferralLinePage({ posts }) {
  const total = Object.keys(LINE_POSTS).length;

  return (
    <>
      <Helmet>
        <title>The Referral-to-Cash Line | Imaging Center Data Analytics | Benefique</title>
        <meta
          name="description"
          content="Every imaging center scan travels one route, from referrer to cash to enterprise value. See where each of our radiology articles sits on the operations line and the financial line."
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
            <span className="text-gray-900">The Referral-to-Cash Line</span>
          </nav>
        </div>
      </div>

      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-benefique-orange mb-3">
            Imaging center data analytics
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-benefique-navy leading-tight mb-5">
            The Referral-to-Cash Line
          </h1>
          <div className="max-w-3xl space-y-4 text-lg text-gray-600">
            <p>
              Every scan an imaging center performs travels one route. A referring provider sends the patient. The
              patient is scheduled, verified, shows up, is scanned and read. The study becomes a claim, the claim
              becomes cash, and the cash becomes margin, owner pay and enterprise value.
            </p>
            <p>
              Most centers run each step with its own team, its own system and its own metric. Each step can look
              healthy while dollars leak between them. We join the operations data to the financial data and read
              the whole line. Each article below points to the stop it is about.
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-500">{total} articles on the line</p>
        </div>
      </section>

      {LINES.map((line, i) => (
        <section key={line.key} className={`py-10 ${i === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide" style={{ color: LINE_COLOR[line.key] }}>
                {line.name}
              </h2>
              <span className="text-sm text-gray-500">{line.route}</span>
            </div>

            <ol className="md:grid md:grid-flow-col md:auto-cols-fr md:gap-0 overflow-x-auto">
              {line.stops.map((stop, si) => {
                const slugs = postsAtStop(stop.code).filter((s) => posts[s]);
                const first = si === 0;
                const last = si === line.stops.length - 1;
                return (
                  <li key={stop.code} id={stop.code} className="relative scroll-mt-24 pl-10 pb-6 md:pl-0 md:pr-2 md:pb-0 md:min-w-[140px]">
                    {/* The line itself: vertical on mobile, horizontal from md up. */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-3 w-2 md:hidden ${first ? 'top-3' : 'top-0'} ${last ? 'h-3' : 'bottom-0'}`}
                      style={{ background: LINE_COLOR[line.key] }}
                    />
                    <span
                      aria-hidden="true"
                      className={`hidden md:block absolute top-[11px] h-2 ${first ? 'left-3' : 'left-0'} ${last ? 'w-5' : 'right-0'}`}
                      style={{ background: LINE_COLOR[line.key] }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 md:left-1 block h-8 w-8 rounded-full bg-white"
                      style={{ border: `6px ${slugs.length ? 'solid' : 'dashed'} ${LINE_COLOR[line.key]}` }}
                    />
                    <div className="md:pt-11">
                      <p className="text-[11px] font-semibold tracking-wider text-gray-400">{stop.code}</p>
                      <h3 className="text-lg font-bold uppercase leading-tight text-benefique-navy">{stop.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{stop.what}</p>
                    </div>
                    {slugs.length > 0 && (
                      <ul className="relative mt-3 ml-0 md:ml-[19px] space-y-2 border-l-2 pl-3" style={{ borderColor: LINE_COLOR[line.key] }}>
                        {slugs.map((slug) => {
                          const alsoStop = LINE_POSTS[slug].also ? stopFor(LINE_POSTS[slug].also) : null;
                          return (
                            <li key={slug} className="relative">
                              <span
                                aria-hidden="true"
                                className="absolute -left-3 top-3 h-0.5 w-3"
                                style={{ background: LINE_COLOR[line.key] }}
                              />
                              <Link
                                to={`/blog/${slug}`}
                                className="block rounded-lg border border-gray-200 bg-white px-3 py-2 md:px-2 text-sm md:text-[13px] font-semibold leading-snug text-gray-800 break-words hyphens-auto hover:border-benefique-orange hover:text-benefique-navy transition"
                              >
                                {posts[slug].title}
                                {alsoStop && (
                                  <span className="block mt-1 text-xs font-normal text-gray-500">Also: {alsoStop.name}</span>
                                )}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>

            {line.key === 'ops' && (
              <p className="mt-8 text-sm text-gray-500">
                Read &amp; sign hands the study to Charge &amp; claim. The route continues on the financial line.
              </p>
            )}
          </div>
        </section>
      ))}

      <section className="py-12 bg-benefique-navy text-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Where does your line leak?</h2>
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
