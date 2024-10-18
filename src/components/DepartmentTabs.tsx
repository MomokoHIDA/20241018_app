import React, { useState } from 'react';
import { Briefcase, UserCheck, UserMinus, Coffee } from 'lucide-react';
import EmployeeList from './EmployeeList';

type EmployeeStatus = 'clockedOut' | 'clockedIn' | 'onBreak';

interface Employee {
  id: number;
  name: string;
  status: EmployeeStatus;
  department: string;
}

interface DepartmentTabsProps {
  employees: Employee[];
}

const DepartmentTabs: React.FC<DepartmentTabsProps> = ({ employees }) => {
  const departments = Array.from(new Set(employees.map(emp => emp.department)));
  const [activeDepartment, setActiveDepartment] = useState(departments[0]);

  const getStatusCounts = (departmentEmployees: Employee[]) => {
    return departmentEmployees.reduce(
      (acc, emp) => {
        acc[emp.status]++;
        return acc;
      },
      { clockedIn: 0, clockedOut: 0, onBreak: 0 }
    );
  };

  const departmentEmployees = employees.filter(emp => emp.department === activeDepartment);
  const statusCounts = getStatusCounts(departmentEmployees);

  return (
    <div>
      <div className="flex mb-4 border-b">
        {departments.map(department => (
          <button
            key={department}
            className={`py-2 px-4 font-semibold ${
              activeDepartment === department
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'
            }`}
            onClick={() => setActiveDepartment(department)}
          >
            <Briefcase className="w-5 h-5 inline-block mr-2" />
            {department}
          </button>
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
          {activeDepartment}
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-100 p-3 rounded-lg flex items-center">
            <UserCheck className="w-5 h-5 mr-2 text-green-600" />
            <span className="font-semibold text-green-800">出勤: {statusCounts.clockedIn}</span>
          </div>
          <div className="bg-red-100 p-3 rounded-lg flex items-center">
            <UserMinus className="w-5 h-5 mr-2 text-red-600" />
            <span className="font-semibold text-red-800">退勤: {statusCounts.clockedOut}</span>
          </div>
          <div className="bg-yellow-100 p-3 rounded-lg flex items-center">
            <Coffee className="w-5 h-5 mr-2 text-yellow-600" />
            <span className="font-semibold text-yellow-800">外出中: {statusCounts.onBreak}</span>
          </div>
        </div>
        <EmployeeList employees={departmentEmployees} />
      </div>
    </div>
  );
};

export default DepartmentTabs;