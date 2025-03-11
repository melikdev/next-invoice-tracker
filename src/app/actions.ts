'use server';

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createAction(formData: FormData) {
  const { userId } = await auth();
  const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
  const description = formData.get('description') as string;

  if (!userId) {
    return;
  }

  const result = await prisma.invoices.create({
    data: {
      value,
      description,
      userId,
      status: 'OPEN',
    },
  });

  redirect(`/invoice/${result.id}`);
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  const results = await prisma.invoices.update({
    where: { id, userId },
    data: { status },
  });

  revalidatePath(`/invoice/${id}`, 'page');
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) return;

  const id = formData.get('id') as string;

  const results = await prisma.invoices.delete({
    where: { id },
  });

  redirect('/dashboard');
}
