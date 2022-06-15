export interface ExitListRequest {

}

export type ExitListResponse = ExitListResponseItem[]

export interface ExitListResponseItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  employeeID: string;
  provinciaID: string;
  employee: {
    proyectos: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      provinciaId: string;
      address: string;
      description: string;
      empleadosIds: [];
      maestrosIds: [];
    }[];
    provincia: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      path: string;
    },
    name: string;
    role: string;
  };
}