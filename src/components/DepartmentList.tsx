import React from 'react';
import { Briefcase } from 'lucide-react';
import EmployeeList from './EmployeeList';

type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  department: string;
}

interface DepartmentListProps {
  employees: Employee[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ employees }) => {
  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  return (
    <div className="space-y-6">
      {departments.map(department => (
        <div key={department} className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
            {department}
          </h3>
          <EmployeeList employees={employees.filter(emp => emp.department === department)} />
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;