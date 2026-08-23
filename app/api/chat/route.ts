import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const MAX_MESSAGE_LENGTH = 1500;
const MAX_HISTORY_TURNS = 12;

const SYSTEM_INSTRUCTION = `You are the support assistant embedded on the NexMentor Solutions website (nexmentorsolutions.com).

About NexMentor Solutions:
- A global provider of enterprise corporate learning, industry-recognized IT vendor certification training, and workforce upskilling.
- Certification training vendors covered include AWS, Microsoft Azure, Google Cloud, NVIDIA, Cisco, Salesforce, Oracle, IBM, VMware/Broadcom, Palo Alto Networks, and more.
- Delivery formats: Fly-Me-A-Trainer (FMAT, on-site), Flexi (self-paced online), 1-on-1 Training, Customised Programmes, and Virtual Live Online.
- Site sections: /courses (full course directory by vendor), /vouchers (certification exam vouchers), /about (company, leadership, mission), /contact (general and partner enquiries).
- Headquarters: Saharanpur Chowk, Dehradun, Uttarakhand, India. Contact: info@nexmentorsolutions.com, +91 95489 88153.

How to respond:
- Be concise, friendly, and professional. Prefer short answers (2-4 sentences) unless the user asks for detail.
- Help visitors understand NexMentor's courses, certifications, delivery formats, and how to get started.
- If asked about specific pricing, exact schedules, or anything you're not certain of, say so honestly and direct them to the Contact page or info@nexmentorsolutions.com rather than guessing.
- If asked something entirely unrelated to NexMentor or corporate training, politely redirect the conversation back to how you can help with training and certifications.
- Never invent certifications, partnerships, or facts about the company that aren't listed above.`;

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The chat assistant is not configured yet. Please try again later or use the Contact page.' },
      { status: 503 }
    );
  }

  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const message = (body.message || '').trim();
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY_TURNS) : [];

  try {
    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...history
        .filter((h) => h && (h.role === 'user' || h.role === 'model') && typeof h.text === 'string')
        .map((h) => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user' as const, parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        maxOutputTokens: 400,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "Sorry, I couldn't generate a response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong reaching the assistant. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
