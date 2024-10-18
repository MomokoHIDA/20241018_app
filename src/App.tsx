import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, Coffee, RotateCcw } from 'lucide-react';
import TimeClock from './components/TimeClock';
import ClockActionButtons from './components/ClockActionButtons';
import DepartmentTabs from './components/DepartmentTabs';
import StatusTabs from './components/StatusTabs';
import ClockHistory from './components/ClockHistory';

// 従業員の状態を表す型
type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

// 従業員の型
interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  department: string;
}

// 打刻イベントの型
interface ClockEvent {
  id: number;
  employeeName: string;
  action: 'clockIn' | 'clockOut' | 'startBreak' | 'endBreak';
  timestamp: Date;
}

// 仮の従業員データ
const initialEmployees: Employee[] = [
  { id: 1, name: '山田 太郎', status: 'clockedIn', department: '営業部' },
  { id: 2, name: '佐藤 花子', status: 'clockedOut', department: '人事部' },
  { id: 3, name: '鈴木 一郎', status: 'onBreak', department: '開発部' },
  { id: 4, name: '田中 美咲', status: 'clockedOut', department: '営業部' },
  { id: 5, name: '高橋 健太', status: 'clockedIn', department: '開発部' },
  { id: 6, name: '渡辺 愛', status: 'clockedIn', department: '人事部' },
];

// 仮の打刻履歴データ
const initialClockEvents: ClockEvent[] = [
  { id: 1, employeeName: '山田 太郎', action: 'clockIn', timestamp: new Date(2023, 3, 15, 8, 30) },
  { id: 2, employeeName: '佐藤 花子', action: 'clockOut', timestamp: new Date(2023, 3, 15, 17, 45) },
  { id: 3, employeeName: '鈴木 一郎', action: 'startBreak', timestamp: new Date(2023, 3, 15, 12, 0) },
  { id: 4, employeeName: '高橋 健太', action: 'clockIn', timestamp: new Date(2023, 3, 15, 9, 0) },
  { id: 5, employeeName: '渡辺 愛', action: 'clockIn', timestamp: new Date(2023, 3, 15, 8, 45) },
];

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentStatus, setCurrentStatus] = useState<EmployeeStatus>('clockedOut');
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeTab, setActiveTab] = useState<'department' | 'status'>('department');
  const [clockEvents, setClockEvents] = useState(initialClockEvents);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockAction = (action: EmployeeStatus) => {
    setCurrentStatus(action);
    // Here you would typically send a request to your backend to record the action
    // For this example, we'll just add a new event to the clockEvents state
    const newEvent: ClockEvent = {
      id: clockEvents.length + 1,
      employeeName: '現在のユーザー', // Replace with actual user name in a real app
      action: action === 'clockedIn' ? 'clockIn' : action === 'clockedOut' ? 'clockOut' : 'startBreak',
      timestamp: new Date(),
    };
    setClockEvents([newEvent, ...clockEvents]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">勤怠管理システム</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <TimeClock currentTime={currentTime} />
            <ClockActionButtons 
              currentStatus={currentStatus} 
              onClockAction={handleClockAction} 
            />
            <div className="text-center text-lg font-semibold text-gray-700">
              {currentStatus === 'clockedIn' && (
                <p className="flex items-center justify-center">
                  <LogIn className="w-6 h-6 mr-2 text-green-500" />
                  出勤中
                </p>
              )}
              {currentStatus === 'clockedOut' && (
                <p className="flex items-center justify-center">
                  <LogOut className="w-6 h-6 mr-2 text-red-500" />
                  退勤中
                </p>
              )}
              {currentStatus === 'onBreak' && (
                <p className="flex items-center justify-center">
                  <Coffee className="w-6 h-6 mr-2 text-yellow-500" />
                  外出中
                </p>
              )}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-4">
              <button
                className={`mr-4 px-4 py-2 rounded-t-lg ${
                  activeTab === 'department' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab('department')}
              >
                部署別
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === 'status' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab('status')}
              >
                状態別
              </button>
            </div>
            <div className="space-y-8">
              {activeTab === 'department' ? (
                <DepartmentTabs employees={employees} />
              ) : (
                <StatusTabs employees={employees} />
              )}
              <ClockHistory events={clockEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;