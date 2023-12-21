import { type Artifact } from './Artifact'
import { type ArtifactRepository } from './ArtifactRepository'

export interface ArtifactRepositoryFactory {
  create: (artifact: Artifact) => Promise<ArtifactRepository>
}
