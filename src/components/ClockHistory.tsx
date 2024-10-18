import React from 'react';
import { Clock, LogIn, LogOut, Coffee, RotateCcw } from 'lucide-react';

interface ClockEvent {
  id: number;
  employeeName: string;
  action: 'clockIn' | 'clockOut' | 'startBreak' | 'endBreak';
  timestamp: Date;
}

interface ClockHistoryProps {
  events: ClockEvent[];
}

const ClockHistory: React.FC<ClockHistoryProps> = ({ events }) => {
  const getActionIcon = (action: ClockEvent['action']) => {
    switch (action) {
      case 'clockIn':
        return <LogIn className="w-5 h-5 text-green-500" />;
      case 'clockOut':
        return <LogOut className="w-5 h-5 text-red-500" />;
      case 'startBreak':
        return <Coffee className="w-5 h-5 text-yellow-500" />;
      case 'endBreak':
        return <RotateCcw className="w-5 h-5 text-blue-500" />;
    }
  };

  const getActionText = (action: ClockEvent['action']) => {
    switch (action) {
      case 'clockIn':
        return '出勤';
      case 'clockOut':
        return '退勤';
      case 'startBreak':
        return '外出';
      case 'endBreak':
        return '戻り';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-gray-600" />
        打刻履歴
      </h3>
      <div className="overflow-y-auto max-h-64">
        <ul className="space-y-2">
          {events.map((event) => (
            <li key={event.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div className="flex items-center">
                {getActionIcon(event.action)}
                <span className="ml-2 font-medium">{event.employeeName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-600">{getActionText(event.action)}</span>
                <span className="text-sm text-gray-500">
                  {event.timestamp.toLocaleString('ja-JP', {
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClockHistory;