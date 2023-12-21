import { type Manifest } from '../manifest/Manifest'
import { type ArtifactFile } from './Artifact'

export interface ArtifactRepository {
  getManifest: () => Promise<Manifest>

  getMatchingArtifactFiles: (pattern: string) => Promise<ArtifactFile[]>
}
