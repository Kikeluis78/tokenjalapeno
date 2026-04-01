'use client';

import { Page } from '@/components/PageLayout';
import { GameCanvas } from '@/components/GameCanvas';

export default function GamePage() {
  return (
    <Page>
      <Page.Main className="h-screen w-full overflow-hidden p-0 m-0 bg-linear-to-br from-yellow-50 via-orange-50 to-red-50">
        <GameCanvas />
      </Page.Main>
    </Page>
  );
}
