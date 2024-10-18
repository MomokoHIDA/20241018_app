import React from 'react';
import { LogIn, LogOut } from 'lucide-react';

interface ClockInOutButtonProps {
  isClockedIn: boolean;
  onClockInOut: () => void;
}

const ClockInOutButton: React.FC<ClockInOutButtonProps> = ({ isClockedIn, onClockInOut }) => {
  return (
    <button
      onClick={onClockInOut}
      className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition-colors ${
        isClockedIn
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {isClockedIn ? (
        <>
          <LogOut className="inline-block mr-2 w-6 h-6" />
          退勤
        </>
      ) : (
        <>
          <LogIn className="inline-block mr-2 w-6 h-6" />
          出勤
        </>
      )}
    </button>
  );
};

export default ClockInOutButton;