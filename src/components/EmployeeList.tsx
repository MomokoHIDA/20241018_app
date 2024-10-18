import React from 'react';
import { User, CheckCircle, XCircle, Coffee } from 'lucide-react';

type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  department: string;
}

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <ul className="space-y-2">
      {employees.map((employee) => (
        <li key={employee.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
          <div className="flex items-center">
            <User className="w-5 h-5 text-gray-500 mr-2" />
            <span>{employee.name}</span>
          </div>
          {employee.status === 'clockedIn' && (
            <div className="flex items-center text-green-500">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">出勤中</span>
            </div>
          )}
          {employee.status === 'clockedOut' && (
            <div className="flex items-center text-red-500">
              <XCircle className="w-5 h-5 mr-1" />
              <span className="text-sm">退勤中</span>
            </div>
          )}
          {employee.status === 'onBreak' && (
            <div className="flex items-center text-yellow-500">
              <Coffee className="w-5 h-5 mr-1" />
              <span className="text-sm">外出中</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;