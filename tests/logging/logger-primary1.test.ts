jest.mock('cluster', () => {
  return {
    isMaster: undefined,
    isPrimary: false
  }
});

import { logger } from '../../src/index'

describe('getCurrentLogger', () => {
  beforeEach(() => {
    logger.resetLoggers()
    process.env.FORK_ID = undefined
  })
  it('Should use isPrimary if isMaster isnt available', () => {
    process.env.FORK_ID = 'fork-1'
    let allLoggers = logger.getAllLoggers()
    expect(allLoggers.get('Fork fork-1 - a')).not.toBeDefined()
    let loggerObj = logger.getCurrentLogger('a')
    console.log('yeet')
    expect(loggerObj).toBeDefined()
    allLoggers = logger.getAllLoggers()
    console.log(allLoggers.keys())
    expect(allLoggers.get('Fork fork-1 - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

