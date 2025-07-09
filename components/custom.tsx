type CustomHeadingProps = {
  children: React.ReactNode;
};

export default function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-4">
      {children}
    </h2>
  );
}
