import * as schema from '../../../schema/manifest-1.0.json'
import Ajv2020 from 'ajv/dist/2020'

export class ManifestValidator {
  private readonly ajv

  constructor () {
    this.ajv = new Ajv2020()
  }

  public validate (manifest: any): void {
    const validateFunction = this.ajv.compile(schema)
    const valid = validateFunction(manifest)
    console.log(validateFunction.errors)
    if (valid) {
      console.log('valid')
    } else {
      console.log('not valid')
    }
  }
}
