import Container from '@/components/Container';
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
import { auth } from '@clerk/nextjs/server';

import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  if (!userId) return;

  const data = await prisma.invoices.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <main className="h-full my-12">
      <Container>
        <div className="flex justify-between mb-6">
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
                      <Badge
                        className={`
                        ${
                          invoice.status === 'PAID' &&
                          'bg-green-100 text-green-800'
                        }
                        ${
                          invoice.status === 'OPEN' &&
                          'bg-blue-100 text-blue-800'
                        }
                        ${
                          invoice.status === 'UNCOLLECTIBLE' &&
                          'bg-red-100 text-red-800'
                        }
                        ${
                          invoice.status === 'VOID' &&
                          'bg-zinc-100 text-zinc-800'
                        }
                        `}
                      >
                        {invoice.status}
                      </Badge>
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
      </Container>
    </main>
  );
}
