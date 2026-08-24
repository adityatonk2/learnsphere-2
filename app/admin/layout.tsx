import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin | NexMentor Solutions',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-200">
        {children}
      </body>
    </html>
  );
}
