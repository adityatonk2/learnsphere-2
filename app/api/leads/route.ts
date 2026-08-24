import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_TYPES = ['partner', 'customer'] as const;
type LeadType = (typeof LEAD_TYPES)[number];

interface LeadPayload {
  type: LeadType;
  name: string;
  email: string;
  company?: string;
  message?: string;
  // Honeypot field — real users never fill this in; bots often do.
  hp?: string;
}

function isLeadType(value: unknown): value is LeadType {
  return typeof value === 'string' && (LEAD_TYPES as readonly string[]).includes(value);
}

export async function POST(req: NextRequest) {
  let body: Partial<LeadPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn to avoid this field.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const type = body.type;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!isLeadType(type)) {
    return NextResponse.json({ error: 'type must be "partner" or "customer".' }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: 'name is required.' }, { status: 400 });
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection('leads').insertOne({
      type,
      name,
      email,
      company: company || null,
      message: message || null,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('Failed to save lead:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
