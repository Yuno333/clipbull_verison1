export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050508] relative overflow-hidden">
      {/* Purple ambient glow */}
      <div className="fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/8 blur-[120px] rounded-full pointer-events-none" />
      {children}
    </div>
  );
}
