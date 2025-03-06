'use server';

import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

export async function createAction(formData: FormData) {
  const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
  const description = formData.get('description') as string;

  const result = await prisma.invoices.create({
    data: {
      value,
      description,
      status: 'OPEN',
    },
  });

  redirect(`/invoices/${result.id}`);
}
