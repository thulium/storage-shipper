import type JSZip from 'jszip'
import { minimatch } from 'minimatch/dist/mjs'
import { type Artifact, type ArtifactFile, sanitizedParentDir } from '../Artifact'
import { ManifestValidator } from '../../manifest/ManifestValidator'
import { type Manifest } from '../../manifest/Manifest'
import { type ArtifactRepository } from '../ArtifactRepository'
import * as R from 'remeda'

export class ZipArtifactRepository implements ArtifactRepository {
  private readonly manifestValidator: ManifestValidator = new ManifestValidator()

  constructor (
    private readonly artifact: Artifact,
    private readonly jsZip: JSZip
  ) {
  }

  public async getManifest (): Promise<Manifest> {
    const manifests = this.jsZip.filter(relativePath => {
      return relativePath.includes('storage-shipper-manifest.json')
    })

    const manifestString = await this.getManifestString(manifests)
    const manifest: Manifest = JSON.parse(manifestString)
    this.manifestValidator.validate(manifest)

    return manifest
  }

  public async getMatchingArtifactFiles (pattern: string): Promise<ArtifactFile[]> {
    const jsZipObjects = this.jsZip.filter(relativePath => {
      const parentDir = sanitizedParentDir(this.artifact)
      if (parentDir != null) {
        relativePath = relativePath.replace(parentDir, '')
      }
      return minimatch(relativePath, pattern)
    })

    const artifactFilesPromise = R.map(jsZipObjects, async (jsZipObject): Promise<ArtifactFile> => {
      const parentDir = sanitizedParentDir(this.artifact) ?? ''
      const data = await jsZipObject.async('arraybuffer') ?? null
      return {
        name: jsZipObject.name.replace(parentDir, ''),
        data
      }
    })
    return await Promise.all(artifactFilesPromise)
  }

  private async getManifestString (manifests: JSZip.JSZipObject[]): Promise<string> {
    if (manifests.length !== 1) {
      throw new Error('Cannot determine correct manifest file')
    }

    const manifestFile = manifests.at(0)
    const manifestString = await manifestFile?.async('text') ?? null
    if (manifestString === null) {
      throw new Error('Cannot read manifest file')
    }

    return manifestString
  }
}
