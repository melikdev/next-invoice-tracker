import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import Invoice from './Invoice';

export default async function SingleInvoice({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId } = await auth();
  if (!userId) return;

  const { invoiceId } = await params;

  const invoice = await prisma.invoices.findUnique({
    where: {
      id: invoiceId,
    },
  });

  if (!invoice) {
    notFound();
  }

  return <Invoice invoice={invoice} />;
}
