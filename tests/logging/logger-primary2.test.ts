jest.mock('cluster', () => {
  return {
    isMaster: undefined,
    isPrimary: undefined
  }
});

import { logger } from '../../src/index'

describe('getCurrentLogger', () => {
  beforeEach(() => {
    logger.resetLoggers()
    process.env.FORK_ID = undefined
  })
  it('Should use true if isPrimary or isMaster isnt available', () => {
    process.env.FORK_ID = 'fork-1'
    let allLoggers = logger.getAllLoggers()
    expect(allLoggers.get('master - a')).not.toBeDefined()
    let loggerObj = logger.getCurrentLogger('a')
    expect(loggerObj).toBeDefined()
    allLoggers = logger.getAllLoggers()
    expect(allLoggers.get('master - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

