import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getDb } from '@/lib/mongodb';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { AdminDashboardClient, type Lead } from './AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!verifySessionToken(session)) {
    redirect('/admin/login');
  }

  const db = await getDb();
  const docs = await db
    .collection('leads')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const leads: Lead[] = docs.map((doc) => ({
    id: String(doc._id),
    type: doc.type === 'partner' ? 'partner' : 'customer',
    name: doc.name ?? '',
    email: doc.email ?? '',
    company: doc.company ?? null,
    message: doc.message ?? null,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt ?? ''),
  }));

  return <AdminDashboardClient leads={leads} />;
}
