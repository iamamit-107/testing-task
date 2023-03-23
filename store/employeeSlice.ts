import { create } from "zustand";

export interface Employee {
  id: number;
  name: string;
  designation: string;
  joiningDate: string;
}

const initFormData = {
  id: 0,
  name: "",
  designation: "",
  joiningDate: "",
};

interface StoreState {
  employees: Employee[];
  editEmployeeItem: Employee;
  addEmployee: (data: Employee) => void;
  addEditEmployeeItem: (data: Employee) => void;
  updateEmployeeItem: (data: Employee) => void;
}

export const useEmployeeStore = create<StoreState>((set) => ({
  employees: [],
  editEmployeeItem: initFormData,
  addEmployee: (employee: Employee) =>
    set((state) => {
      return {
        ...state,
        employees: [...state.employees, employee],
      };
    }),
  addEditEmployeeItem: (employee: Employee) =>
    set((state) => {
      return {
        ...state,
        editEmployeeItem: employee,
      };
    }),
  updateEmployeeItem: (employee: Employee) =>
    set((state) => {
      const index = state.employees.findIndex((employeeItem) => employeeItem.id === employee.id);
      const update = state.employees;
      update[index] = { ...employee };
      return {
        ...state,
        employees: [...update],
      };
    }),
}));
