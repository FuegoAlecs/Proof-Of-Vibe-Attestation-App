import { Flame } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full py-6 px-4 border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="w-8 h-8 text-[#FF6600]" />
          <div>
            <h1 className="text-2xl font-bold">Proof of Vibe</h1>
            <p className="text-sm text-muted-foreground">
              Mint your vibe attestation on Sign Protocol
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}