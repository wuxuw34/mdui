export default function Row({
  children,
  className,
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-row gap-2 text-nowrap ${className}`}>
      {children}
    </div>
  );
}
