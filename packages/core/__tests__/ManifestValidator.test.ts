import { ManifestValidator } from '../src/ManifestValidator'

describe('manifest validator test', () => {
  it('should not throw exception when json is valid', () => {
    // given
    const json = {
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

    // when
    manifestValidator.validate(json)

    // then
    expect(true).toBeTruthy()
  })
})
