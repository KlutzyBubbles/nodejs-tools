jest.mock('cluster', () => {
  return {
    isMaster: undefined,
    isPrimary: false
  }
});

import { getAllLoggers, getCurrentLogger, resetLoggers } from '../../src/index'

describe('getCurrentLogger', () => {
  beforeEach(() => {
    resetLoggers()
    process.env.FORK_ID = undefined
  })
  it('Should use isPrimary if isMaster isnt available', () => {
    process.env.FORK_ID = 'fork-1'
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('Fork fork-1 - a')).not.toBeDefined()
    let loggerObj = getCurrentLogger('a')
    console.log('yeet')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    console.log(allLoggers.keys())
    expect(allLoggers.get('Fork fork-1 - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

