import { cn } from '@/lib/utils';

function DetailInfo({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex gap-x-2 max-w-full', className)} {...props} />
  );
}

function DetailInfoLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('w-[80px] text-sm text-secondary-foreground', className)}
      {...props}
    />
  );
}

function DetailInfoContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-sm text-mono font-medium', className)}
      {...props}
    />
  );
}

export { DetailInfo, DetailInfoLabel, DetailInfoContent };
