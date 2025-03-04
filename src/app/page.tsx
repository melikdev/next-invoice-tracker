import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto">
      <h1>Trackinvoice</h1>
      <Button asChild>
        <Link href="/dashboard">Sign in</Link>
      </Button>
    </main>
  );
}
