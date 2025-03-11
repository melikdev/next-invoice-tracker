'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createAction } from '@/app/actions';
import { SyntheticEvent, useState, startTransition } from 'react';
import SubmitButton from '@/components/SubmitButton';
import Container from '@/components/Container';

export default function Home() {
  const [state, setState] = useState('ready');

  async function handleOnSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (state === 'pending') return;
    setState('pending');
    const target = e.target as HTMLFormElement;

    startTransition(async () => {
      const formData = new FormData(target);
      await createAction(formData);
      console.log('hey');
    });
  }

  return (
    <main className="my-12">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="font-semibold text-3xl">Create Invoice</h1>
        </div>

        <form
          onSubmit={handleOnSubmit}
          action={createAction}
          className="grid gap-4 max-w-xs"
        >
          <div>
            <Label htmlFor="name" className="block font-semibold text-sm mb-2">
              Billing name:
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block font-semibold text-sm mb-2">
              Billing Email:
            </Label>
            <Input id="email" name="email" type="text" />
          </div>
          <div>
            <Label htmlFor="value" className="block font-semibold text-sm mb-2">
              Value:
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block font-semibold text-sm mb-2"
            >
              Description:
            </Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </Container>
    </main>
  );
}
