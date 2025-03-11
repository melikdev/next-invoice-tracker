import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { Button } from './ui/button';
import Container from './Container';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <p className="font-bold">
            <Link href="/dashboard">Trackinvoice</Link>
          </p>
          <div className="flex gap-3">
            <SignedOut>
              <Button asChild>
                <SignInButton />
              </Button>
              <Button asChild>
                <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
}
