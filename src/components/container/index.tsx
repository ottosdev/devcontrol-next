interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="w-full max-w-7xl mx-auto px-3">{children}</div>;
}
