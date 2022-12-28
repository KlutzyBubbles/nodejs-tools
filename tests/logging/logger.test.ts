import { getAllLoggers, getCurrentLogger, resetLoggers, getLogger, getForkName, formatObject } from '../../src/index'

describe('getLogger', () => {
  beforeEach(() => {
    resetLoggers()
  })
  it('Should throw on empty name', () => {
    expect(() => { getLogger('a', '') }).toThrow()
  })
  it('Should throw on empty fork', () => {
    expect(() => { getLogger('', 'b') }).toThrow()
  })
  it('Should throw on empty name and fork', () => {
    expect(() => { getLogger('', '') }).toThrow()
  })
  it('Should create logger', () => {
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('a - b')).not.toBeDefined()
    const loggerObj = getLogger('a', 'b')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('a - b')).toBeDefined()
  })
  it('Should use existing logger', () => {
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('a - b')).not.toBeDefined()
    let loggerObj = getLogger('a', 'b')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('a - b')).toBeDefined()
    expect(allLoggers.size).toBe(1)
    loggerObj = getLogger('a', 'b')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('a - b')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

describe('getCurrentLogger', () => {
  beforeEach(() => {
    resetLoggers()
    process.env.FORK_ID = undefined
  })
  it('Should throw on empty name', () => {
    expect(() => { getCurrentLogger('') }).toThrow()
  })
  it('Should create logger', () => {
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).not.toBeDefined()
    const loggerObj = getCurrentLogger('a')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).toBeDefined()
  })
  it('Should use existing logger', () => {
    let allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).not.toBeDefined()
    let loggerObj = getCurrentLogger('a')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
    loggerObj = getCurrentLogger('a')
    expect(loggerObj).toBeDefined()
    allLoggers = getAllLoggers()
    expect(allLoggers.get('master - a')).toBeDefined()
    expect(allLoggers.size).toBe(1)
  })
})

describe('getForkName', () => {
  beforeEach(() => {
    resetLoggers()
  })
  it('Should return master', () => {
    const forkName = getForkName(true, undefined, undefined)
    expect(forkName).toBe('master')
  })
  it('Should return master for blank name', () => {
    const forkName = getForkName(true, '', undefined)
    expect(forkName).toBe('master')
  })
  it('Should return fork id for blank name', () => {
    const forkName = getForkName(false, '', '1')
    expect(forkName).toBe('Fork 1')
  })
  it('Should return fork blank for blank name', () => {
    const forkName = getForkName(false, '', undefined)
    expect(forkName).toBe('Fork')
  })
  it('Should return name', () => {
    const forkName = getForkName(true, 'name', undefined)
    expect(forkName).toBe('name')
  })
  it('Should return fork id', () => {
    const forkName = getForkName(false, undefined, '1')
    expect(forkName).toBe('Fork 1')
  })
  it('Should return fork blank', () => {
    const forkName = getForkName(false, undefined, undefined)
    expect(forkName).toBe('Fork')
  })
  it('Should return fork blank with empty', () => {
    const forkName = getForkName(false, undefined, '')
    expect(forkName).toBe('Fork')
  })
})

describe('Format Object', () => {
  beforeAll(() => {
    resetLoggers()
  })
  it('Should format strings', () => {
    const info = formatObject('yeet')
    expect(info).toBe('yeet')
  })
  it('Should format errors', () => {
    const info = formatObject(new Error('yeetErr'))
    expect(info).toBe('yeetErr')
  })
  it('Should format objects', () => {
    const info = formatObject({ value: 'yar' })
    expect(info).toBe('{"value":"yar"}')
  })
  it('Should format object message', () => {
    const info = formatObject({ message: 'yar' })
    expect(info).toBe('yar')
  })
  it('Should format undefined', () => {
    const info = formatObject(undefined)
    expect(info).toBe('undefined')
  })
  it('Should format null', () => {
    const info = formatObject(null)
    expect(info).toBe('null')
  })
})
