import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WagmiProvider } from '@/providers/wagmi-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Proof of Vibe - Sign Protocol Attestations',
  description: 'Mint your vibe attestation on Sign Protocol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>{children}</WagmiProvider>
      </body>
    </html>
  );
}