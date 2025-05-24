'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { signProtocol } from '@/lib/sign-protocol';
import { VibeAttestationBadge } from './vibe-attestation-badge';

export function VibeAttestationForm() {
  const [vibeTarget, setVibeTarget] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attestationId, setAttestationId] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = async (connector: MetaMaskConnector | WalletConnectConnector) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleMint = async () => {
    if (!address || !vibeTarget) return;
    
    setIsLoading(true);
    try {
      const result = await signProtocol.mintAttestation(
        address,
        `I vibe with ${vibeTarget}`
      );
      
      if (result.success) {
        setAttestationId(result.attestationId);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      {!isConnected ? (
        <div className="space-y-4">
          <Button
            className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
            onClick={() => handleConnect(new MetaMaskConnector())}
          >
            Connect with MetaMask
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => handleConnect(new WalletConnectConnector({
              options: { projectId: 'YOUR_PROJECT_ID' }
            }))}
          >
            Connect with WalletConnect
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <Button variant="ghost" size="sm" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
          
          <Input
            placeholder="Who do you vibe with? (Project, Person, or Idea)"
            value={vibeTarget}
            onChange={(e) => setVibeTarget(e.target.value)}
            disabled={isLoading}
          />
          
          <Button
            className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
            onClick={handleMint}
            disabled={!vibeTarget || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting...
              </>
            ) : (
              'Mint Vibe Attestation'
            )}
          </Button>
          
          {attestationId && (
            <VibeAttestationBadge
              vibeTarget={vibeTarget}
              address={address}
              attestationId={attestationId}
            />
          )}
        </div>
      )}
    </Card>
  );
}