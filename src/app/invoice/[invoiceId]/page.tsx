import { Badge } from '@/components/ui/badge';
import prisma from '@/lib/prisma';
import { cn } from '@/lib/utils';

export default async function SingleInvoice({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { invoiceId } = await params;

  const invoice = await prisma.invoices.findUnique({
    where: {
      id: invoiceId,
    },
  });

  return (
    <main className="h-full mx-auto max-w-5xl my-12">
      <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-4 font-semibold text-3xl">
          {`Invoice ${invoice?.id}`}
          <Badge
            className={cn(
              'rounded-full',
              invoice?.status === 'OPEN' && 'bg-blue-500',
              invoice?.status === 'PAID' && 'bg-green-500',
              invoice?.status === 'UNCOLLECTIBLE' && 'bg-red-600',
              invoice?.status === 'VOID' && 'bg-zinc-700'
            )}
          >
            {invoice?.status}
          </Badge>
        </h1>
      </div>

      <p className="text-3xl mb-3">
        ${((invoice?.value ?? 0) / 100).toFixed(2)}
      </p>

      <p className="text-lg mb-8">{invoice?.description}</p>

      <h2 className="font-bold text-lg mb-4">Billing Details</h2>

      <ul className="grid gap-2">
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice ID
          </strong>
          <span>{invoice?.id}</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Invoice Date
          </strong>
          <span>
            {invoice ? new Date(invoice.createdAt).toLocaleDateString() : 'N/A'}
          </span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Name
          </strong>
          <span>name</span>
        </li>
        <li className="flex gap-4">
          <strong className="block w-28 flex-shrink-0 font-medium text-sm">
            Billing Email
          </strong>
          <span>Customer email</span>
        </li>
      </ul>
    </main>
  );
}
