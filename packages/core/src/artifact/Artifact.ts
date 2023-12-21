export interface Artifact {
  parentDir?: string
  path: string
}

export interface ArtifactFile {
  name: string
  data: ArrayBuffer | null
}

export function sanitizedParentDir (artifact: Artifact): string | null | undefined {
  const parentDir = artifact.parentDir
  if (parentDir == null) {
    return parentDir
  }
  return parentDir.endsWith('/') ? '' : '/'
}
