import { type Destination } from './Destination'
import { type Artifact, type ArtifactFile } from './artifact/Artifact'

export interface StorageUploader {
  upload: (artifactFiles: ArtifactFile[], destination: Destination, artifact: Artifact) => void
}
