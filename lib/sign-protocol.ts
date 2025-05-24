import { SignClient } from '@sign-protocol/sign-client';

export class SignProtocolService {
  private client: SignClient;

  constructor() {
    this.client = new SignClient({
      chainId: 80001, // Mumbai testnet
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
    });
  }

  async mintAttestation(address: string, message: string) {
    try {
      const attestation = await this.client.createAttestation({
        message,
        signer: address,
      });
      
      return {
        success: true,
        attestationId: attestation.id,
        transactionHash: attestation.transactionHash,
      };
    } catch (error) {
      console.error('Error minting attestation:', error);
      return {
        success: false,
        error: 'Failed to mint attestation',
      };
    }
  }
}

export const signProtocol = new SignProtocolService();