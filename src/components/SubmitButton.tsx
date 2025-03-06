'use client';

import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  console.log('pending', pending);

  return (
    <Button className="w-full font-semibold" type="submit">
      <span>
        {pending ? (
          <span>
            <LoaderCircle className="animate-spin" />
          </span>
        ) : (
          'Submit'
        )}
      </span>
    </Button>
  );
}
