import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import Invoice from './Invoice';

type Params = Promise<{ invoiceId: string }>;

export default async function SingleInvoice(props: { params: Params }) {
  const { userId } = await auth();
  if (!userId) return;

  const params = await props.params;
  const invoiceId = params.invoiceId;

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
