export default function Row({
  children,
  className,
  style,
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex flex-row gap-2 text-nowrap items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
