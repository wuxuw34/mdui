export default function Col({ children }: { children?: React.ReactNode }) {
  return (
    <div className="m-2 flex flex-col gap-2 text-nowrap">
      {children}
    </div>
  );
}
