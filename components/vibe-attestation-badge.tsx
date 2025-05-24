'use client';

import { useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface VibeAttestationBadgeProps {
  vibeTarget: string;
  address: string;
  attestationId: string;
}

export function VibeAttestationBadge({
  vibeTarget,
  address,
  attestationId,
}: VibeAttestationBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!badgeRef.current) return;
    
    const canvas = await html2canvas(badgeRef.current);
    const link = document.createElement('a');
    link.download = 'vibe-attestation.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleShare = async () => {
    const text = `I just minted a Proof of Vibe attestation: I vibe with ${vibeTarget}! 🔥\n\nView it on SignScan: https://testnetscan.sign.global/attestation/${attestationId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          text,
          url: `https://testnetscan.sign.global/attestation/${attestationId}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        ref={badgeRef}
        className="p-6 bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Flame className="w-6 h-6 text-[#FF6600]" />
          <h3 className="text-lg font-semibold">Proof of Vibe</h3>
        </div>
        
        <p className="text-xl font-medium mb-2">I vibe with {vibeTarget}</p>
        
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Attested by: {address.slice(0, 6)}...{address.slice(-4)}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        
        <a
          href={`https://testnetscan.sign.global/attestation/${attestationId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF6600] text-sm hover:underline mt-4 block"
        >
          View on SignScan ↗
        </a>
      </Card>
      
      <div className="flex space-x-2">
        <Button
          onClick={handleDownload}
          className="flex-1"
          variant="outline"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Badge
        </Button>
        <Button
          onClick={handleShare}
          className="flex-1 bg-[#FF6600] hover:bg-[#FF6600]/90"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}