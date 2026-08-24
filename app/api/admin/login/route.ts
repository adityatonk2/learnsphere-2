import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, verifyPassword, SESSION_COOKIE_NAME, SESSION_TTL_MS } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!storedHash) {
    console.error('ADMIN_PASSWORD_HASH is not set.');
    return NextResponse.json({ error: 'Admin login is not configured.' }, { status: 500 });
  }

  if (!password || !verifyPassword(password, storedHash)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}
