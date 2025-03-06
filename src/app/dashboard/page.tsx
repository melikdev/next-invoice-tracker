import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import prisma from '@/lib/prisma';

import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const data = await prisma.invoices.findMany();
  console.log(data);

  return (
    <main className="flex flex-col justify-center m-auto text-center max-w-5xl gap-6 my-12">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">Invoices</h1>
        <p>
          <Button className="inline-flex gap-2" variant="ghost" asChild>
            <Link href="/invoices/new">
              <CirclePlus size={16} className="h-4 w-4 flex gap-2" />
              Create invoice
            </Link>
          </Button>
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => {
            return (
              <TableRow key={invoice.id}>
                <TableCell className="text-left font-medium">
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="font-semibold"
                  >
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="font-semibold"
                  >
                    Philip J. Fry
                  </Link>
                </TableCell>
                <TableCell className="text-left">
                  <Link href={`/invoice/${invoice.id}`}>
                    fry@planetexpress.com
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/invoice/${invoice.id}`}>
                    <Badge className="rounded-full">{invoice.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/invoice/${invoice.id}`}
                    className="font-semibold"
                  >
                    ${(invoice.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
