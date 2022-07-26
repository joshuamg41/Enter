export interface EmployeeRequest {}

export type EmployeeResponse = EmployeeResponseItem[];

export interface EmployeeResponseItem {
  id: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  proyectosIds: string[];
  provinciaId: string;
  maestroId: string;
  laborID: number;
  calificacion: number;
  provincia: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    path: string;
  };
  proyectos: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    provinciaId: string;
    address: string;
    description: string;
    empleadosIds: string[];
    maestrosIds: string[];
  }[];
  maestro: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    docNumber: string;
    laborID: string;
    proyectosIds: string[];
    status: boolean;
  };
}

export type RoleResponse = RoleResponseItem[];

export interface RoleResponseItem {
  id: string;
  name: string;
  description: string;
}

export type LaborResponse = LaborResponseItem[];

export interface LaborResponseItem {
  id: string;
  type: string;
  description: string;
}

export type MasterResponse = MasterResponseItem[];

export interface MasterResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  laborId: string;
  proyectosIds: string[];
  name: string;
  docNumber: string;
}

export interface PostEmployeeRequest {}

export interface PostEmployeeResponse {
  createdAt: string;
  id: string;
  maestroId: string;
  name: string;
  provinciaId: string;
  proyectosIds: string[];
  role: string;
  updatedAt: string;
}
