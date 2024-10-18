import React from 'react';
import { LogIn, LogOut, Coffee, RotateCcw, Smartphone } from 'lucide-react';

type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

interface ClockActionButtonsProps {
  currentStatus: EmployeeStatus;
  onClockAction: (action: EmployeeStatus) => void;
}

const ClockActionButtons: React.FC<ClockActionButtonsProps> = ({ currentStatus, onClockAction }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-100 p-6 rounded-xl text-center">
        <Smartphone className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <p className="text-lg font-semibold mb-2">NFCでタッチして打刻</p>
        <p className="text-sm text-gray-600">スマートフォンをかざしてください</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onClockAction('clockedIn')}
          className={`py-6 px-4 rounded-xl text-white font-bold text-xl transition-colors ${
            currentStatus === 'clockedIn' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
          } flex flex-col items-center justify-center`}
          disabled={currentStatus === 'clockedIn'}
        >
          <LogIn className="w-8 h-8 mb-2" />
          出勤
        </button>
        <button
          onClick={() => onClockAction('onBreak')}
          className={`py-6 px-4 rounded-xl text-white font-bold text-xl transition-colors ${
            currentStatus === 'onBreak' ? 'bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600'
          } flex flex-col items-center justify-center`}
          disabled={currentStatus === 'onBreak'}
        >
          <Coffee className="w-8 h-8 mb-2" />
          外出
        </button>
        <button
          onClick={() => onClockAction('clockedIn')}
          className={`py-6 px-4 rounded-xl text-white font-bold text-xl transition-colors ${
            currentStatus === 'clockedIn' && currentStatus !== 'onBreak' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          } flex flex-col items-center justify-center`}
          disabled={currentStatus === 'clockedIn' && currentStatus !== 'onBreak'}
        >
          <RotateCcw className="w-8 h-8 mb-2" />
          戻り
        </button>
        <button
          onClick={() => onClockAction('clockedOut')}
          className={`py-6 px-4 rounded-xl text-white font-bold text-xl transition-colors ${
            currentStatus === 'clockedOut' ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'
          } flex flex-col items-center justify-center`}
          disabled={currentStatus === 'clockedOut'}
        >
          <LogOut className="w-8 h-8 mb-2" />
          退勤
        </button>
      </div>
    </div>
  );
};

export default ClockActionButtons;