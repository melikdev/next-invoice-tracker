import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div {...props} className={cn('max-w-5xl mx-auto px-5', className)}>
      {children}
    </div>
  );
}
