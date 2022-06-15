export interface ProvinceRequest {

}

export type ProvinceResponse = ProvinceResponseItem[]

export interface ProvinceResponseItem {
  id: string;
  name: string;
  path: string;
  proyectos: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    empleadosIds: string;
    provinciaId: string;
  }[];
  empleados: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    role: string;
    proyectosIds: string[];
    provinciaId: string;
  }[];
  employeeEntry: {}[];
  employeeEntries: {}[];
}

export type LaborResponse = LaborResponseItem[]

export interface LaborResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  docNumber: string;
  laborID: string;
  proyectosIds: string[];
  status: boolean;
  labor: {
    id: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    description: string;
    status: boolean;
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
}

export type MasterResponse = MasterResponseItem[]

export interface MasterResponseItem {
  id: string;
  docNumber: string;
  name: string;
}

export interface EntryProvinceRequest {
  id: string;
}

export type EntryProvinceResponse = EntryProvinceResponseItem[]

export interface EntryProvinceResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  employeeID: string;
  provinciaID: string;
  proyectoID: string;
  maestroID: string;
  laborID: string;
}

export interface EntryProjectRequest {
  id: string;
}

export type EntryProjectResponse = EntryProjectResponseItem[]

export interface EntryProjectResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  employeeID: string;
  provinciaID: string;
  proyectoID: string;
  maestroID: string;
  laborID: string;
}

export interface EntryMasterRequest {
  id: string;
}

export type EntryMasterResponse = EntryMasterResponseItem[]

export interface EntryMasterResponseItem {
  createdAt: string;
  employee: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    role: string;
    proyectosIds: string[];
    provinciaId: string;
    maestroId: string;
  }
}

export interface EntryLaborRequest {
  id: string;
}

export type EntryLaborResponse = EntryLaborResponseItem[]

export interface EntryLaborResponseItem {
  createdAt: string;
  employee: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    role: string;
    proyectosIds: string[];
    provinciaId: string;
    maestroId: string;
  }
}