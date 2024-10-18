import React from 'react';
import { UserCheck, UserMinus, Coffee } from 'lucide-react';
import EmployeeList from './EmployeeList';

type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  department: string;
}

interface StatusTabsProps {
  employees: Employee[];
}

const StatusTabs: React.FC<StatusTabsProps> = ({ employees }) => {
  const [activeStatus, setActiveStatus] = React.useState<EmployeeStatus>('clockedIn');

  const statusEmployees = employees.filter(emp => emp.status === activeStatus);

  const getStatusCount = (status: EmployeeStatus) => {
    return employees.filter(emp => emp.status === status).length;
  };

  return (
    <div>
      <div className="flex mb-4 border-b">
        <button
          className={`py-2 px-4 font-semibold ${
            activeStatus === 'clockedIn'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveStatus('clockedIn')}
        >
          <UserCheck className="w-5 h-5 inline-block mr-2" />
          出勤中 ({getStatusCount('clockedIn')})
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeStatus === 'clockedOut'
              ? 'text-red-600 border-b-2 border-red-600'
              : 'text-gray-500 hover:text-red-600'
          }`}
          onClick={() => setActiveStatus('clockedOut')}
        >
          <UserMinus className="w-5 h-5 inline-block mr-2" />
          退勤中 ({getStatusCount('clockedOut')})
        </button>
        <button
          className={`py-2 px-4 font-semibold ${
            activeStatus === 'onBreak'
              ? 'text-yellow-600 border-b-2 border-yellow-600'
              : 'text-gray-500 hover:text-yellow-600'
          }`}
          onClick={() => setActiveStatus('onBreak')}
        >
          <Coffee className="w-5 h-5 inline-block mr-2" />
          外出中 ({getStatusCount('onBreak')})
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          {activeStatus === 'clockedIn' && <UserCheck className="w-5 h-5 mr-2 text-green-500" />}
          {activeStatus === 'clockedOut' && <UserMinus className="w-5 h-5 mr-2 text-red-500" />}
          {activeStatus === 'onBreak' && <Coffee className="w-5 h-5 mr-2 text-yellow-500" />}
          {activeStatus === 'clockedIn' && '出勤中の従業員'}
          {activeStatus === 'clockedOut' && '退勤中の従業員'}
          {activeStatus === 'onBreak' && '外出中の従業員'}
        </h3>
        <EmployeeList employees={statusEmployees} />
      </div>
    </div>
  );
};

export default StatusTabs;