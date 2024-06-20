export interface Manifest {
  version: string
  deploy: Deploy[]
}

export interface Deploy {
  name: string
  include: string
  headers?: object
}
