import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { VibeAttestationForm } from '@/components/vibe-attestation-form';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
        <VibeAttestationForm />
      </main>
      <Footer />
    </div>
  );
}