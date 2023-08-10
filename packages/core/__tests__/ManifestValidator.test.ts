import { ManifestValidator } from '../src/ManifestValidator'

describe('manifest validator test', () => {
  it('should not throw exception when json is valid', () => {
    // given
    const manifest = {
      version: '1.0',
      deploy: [
        {
          name: 'resources',
          include: 'v1-rc6/resources/*',
          headers: {
            'content-cache': 'public, max-age=2592000'
          }
        },
        {
          name: 'main',
          include: 'v1-rc6/*.js',
          headers: {
            'content-encoding': 'gzip',
            'content-type': 'text/javascript',
            'content-cache': 'public, max-age=2592000'
          }
        },
        {
          name: 'chat-loader',
          include: 'chat-loader.js',
          headers: {
            'content-encoding': 'gzip',
            'content-typ': 'text/javascript',
            'content-cache': 'public, max-age=300'
          }
        }
      ]
    }

    const manifestValidator = new ManifestValidator()

    // when/then
    expect(() => {
      manifestValidator.validate(manifest)
    }).not.toThrow()
  })

  it('should throw exception when json is not valid', () => {
    // given
    const manifest = {
      version: 'invalid-version',
      deploy: [
        {
          name: 'resources',
          include: 'v1-rc6/resources/*',
          headers: {
            'content-cache': 'public, max-age=2592000'
          }
        },
        {
          name: 'main',
          include: 'v1-rc6/*.js',
          headers: {
            'content-encoding': 'gzip',
            'content-type': 'text/javascript',
            'content-cache': 'public, max-age=2592000'
          }
        },
        {
          name: 'chat-loader',
          include: 'chat-loader.js',
          headers: {
            'content-encoding': 'gzip',
            'content-typ': 'text/javascript',
            'content-cache': 'public, max-age=300'
          }
        }
      ]
    }

    const manifestValidator = new ManifestValidator()

    // when/then
    expect(() => {
      manifestValidator.validate(manifest)
    }).toThrow('Storage shipper manifest is not valid. Error: [path: \'/version\'] [message: \'must match pattern "^([1-9]\\d*)\\.(?:0|[1-9]\\d*)$"\']')
  })
})
