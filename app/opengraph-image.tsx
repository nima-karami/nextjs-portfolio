import { readFile } from 'node:fs/promises';

import { ImageResponse } from 'next/og';

import { profile } from './data/profile';

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// On-brand social card: a terminal window rendered in JetBrains Mono so a shared
// link reads as the site itself. Copy comes from profile data (never hardcoded).
export default async function OpengraphImage() {
  const mono = await readFile(
    new URL('./JetBrainsMono-Regular.ttf', import.meta.url)
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#0a0e14',
          color: '#c7d0d9',
          fontFamily: 'JetBrains Mono',
          padding: 64,
          justifyContent: 'space-between',
          border: '2px solid #1f2a36',
        }}
      >
        <div style={{ display: 'flex', color: '#747e89', fontSize: 26 }}>
          nima-karami.com
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, color: '#c7d0d9' }}>
            <span style={{ color: '#59c2ff' }}>&gt;&nbsp;</span>
            {profile.name.toLowerCase()}
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#59c2ff', marginTop: 18 }}>
            {profile.title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: '#747e89',
              marginTop: 22,
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#7fd962' }}>
          visitor@portfolio:~$
          <span style={{ color: '#c7d0d9' }}>&nbsp;type help to explore █</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' }],
    }
  );
}
