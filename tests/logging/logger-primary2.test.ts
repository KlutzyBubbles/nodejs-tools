jest.mock('cluster', () => {
  return {
    isMaster: undefined,
    isPrimary: undefined
  }
});

import { getAllLoggers, getCurrentLogger, resetLoggers } from '../../src/index'

describe('getCurrentLogger', () => {
  beforeEach(() => {
    resetLoggers()
    process.env.FORK_ID = undefined
  })
  it('Should use true if isPrimary or isMaster isnt available', () => {
    process.env.FORK_ID = 'fork-1'
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).not.toBeDefined()
    let loggerObj = getCurrentLogger('a')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

