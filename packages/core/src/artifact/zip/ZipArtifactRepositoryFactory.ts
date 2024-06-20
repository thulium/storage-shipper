import JSZip from 'jszip'
import { type ArtifactRepository } from '../ArtifactRepository'
import * as fs from 'fs'
import { type ArtifactRepositoryFactory } from '../ArtifactRepositoryFactory'
import { type Artifact } from '../Artifact'
import { ZipArtifactRepository } from './ZipArtifactRepository'

export class ZipArtifactRepositoryFactory implements ArtifactRepositoryFactory {
  private readonly jsZip = new JSZip()

  public async create (artifact: Artifact): Promise<ArtifactRepository> {
    const path = artifact.path

    if (!fs.existsSync(path)) {
      throw new Error(`Artifact '${path}' does not exists`)
    }

    const archive = fs.readFileSync(path)
    const jsZip = await this.jsZip.loadAsync(archive)
    return new ZipArtifactRepository(artifact, jsZip)
  }
}
