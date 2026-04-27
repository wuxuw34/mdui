export default function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-6 gap-1">{children}</div>;
}
