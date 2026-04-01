'use client';
import { Button } from '@worldcoin/mini-apps-ui-kit-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';

export const AuthButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/game');
    }, 500);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 bg-black px-8 py-4 rounded-full">
        <motion.div
          className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-white font-bold">Cargando...</span>
      </div>
    );
  }

  return (
    <Button
      onClick={onClick}
      size="lg"
      variant="primary"
    >
      🎮 Jugar Lotería
    </Button>
  );
};
