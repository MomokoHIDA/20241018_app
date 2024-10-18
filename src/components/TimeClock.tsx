import React from 'react';
import { Clock } from 'lucide-react';

interface TimeClockProps {
  currentTime: Date;
}

const TimeClock: React.FC<TimeClockProps> = ({ currentTime }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="text-center mb-6">
      <Clock className="w-16 h-16 mx-auto mb-2 text-blue-500" />
      <div className="text-4xl font-bold">{formatTime(currentTime)}</div>
      <div className="text-gray-600">
        {currentTime.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
      </div>
    </div>
  );
};

export default TimeClock;