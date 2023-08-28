import * as schema from '../../../../schema/manifest-1.0.json'
import Ajv2020 from 'ajv/dist/2020'
import * as R from 'remeda'
import { type Manifest } from './Manifest'

export class ManifestValidator {
  private readonly ajv = new Ajv2020()

  public validate (manifest: Manifest | undefined): void {
    const validateFunction = this.ajv.compile(schema)
    const valid = validateFunction(manifest)
    const errors = validateFunction.errors ?? []
    if (!valid) {
      const errorMessagesString = R
        .map(errors, (error) => {
          return `[path: '${error.instancePath}'] [message: '${error.message ?? 'unknown error'}']`
        })
        .join(',')

      throw new Error(`Storage shipper manifest is not valid. Error: ${errorMessagesString}`)
    }
  }
}
