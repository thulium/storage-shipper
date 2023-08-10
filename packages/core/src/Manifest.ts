export interface Manifest {
  version: string
  deploy: Deploy[]
}

interface Deploy {
  name: string
  include: string
  headers?: object
}
