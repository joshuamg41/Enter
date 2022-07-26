export interface PostAccidentRequest {

}

export interface PostAccidentResponse {

}

export interface GetAccidentRequest {

}

export type GetAccidentResponse = GetAccidentResponseItem[]

export interface GetAccidentResponseItem {
  id: string;
  employeeName: string;
  employee: {
    name: string;
    id: string;
  },
  province: {
    name: string;
    id: string;
  },
  project: {
    name: string;
    id: string;
  },
  description: string;
  adminReviewed: boolean;
  images: [];
  image: string;
}