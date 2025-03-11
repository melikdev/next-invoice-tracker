import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <Container className="text-center">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="font-bold text-5xl">Trackinvoice</h1>

        <Button>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </Container>
  );
}
