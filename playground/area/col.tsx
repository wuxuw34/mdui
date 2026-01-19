export default function Col({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`m-2 flex flex-col gap-2 text-nowrap ${className}`}>
      {children}
    </div>
  );
}
