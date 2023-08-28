import { type StorageUploader } from './StorageUploader'
import { type Destination } from './Destination'
import { type ArtifactRepositoryFactory } from './artifact/ArtifactRepositoryFactory'
import { type Artifact } from './artifact/Artifact'

export class StorageShipper {
  constructor (
    private readonly artifactRepositoryFactory: ArtifactRepositoryFactory,
    private readonly storageUploader: StorageUploader
  ) {
  }

  public async shipIt (artifact: Artifact, destination: Destination): Promise<void> {
    const artifactRepository = await this.artifactRepositoryFactory.create(artifact)

    const manifest = await artifactRepository.getManifest()

    const deploys = manifest.deploy
    for (const deploy of deploys) {
      const artifactFiles = await artifactRepository.getMatchingArtifactFiles(deploy.include)
      this.storageUploader.upload(artifactFiles, destination, artifact)
    }
  }
}
