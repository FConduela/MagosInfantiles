'use client';

import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  message: string;
  onClose: () => void;
  redirectPath: string;
}

export default function SuccessModal({ message, onClose, redirectPath }: SuccessModalProps) {
  const router = useRouter();

  const handleAccept = () => {
    onClose();
    router.push(redirectPath);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#0A0F23] p-6 rounded-lg shadow-xl max-w-md w-full mx-4 border border-[#32C3F2]/20">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500/10 mb-4">
            <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">¡Éxito!</h3>
          <p className="text-white/80 mb-6">{message}</p>
          <button
            onClick={handleAccept}
            className="w-full bg-[#32C3F2] text-white px-4 py-2 rounded-md hover:bg-[#1A6AC9] transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
} 