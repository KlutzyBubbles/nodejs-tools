/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'
import * as logger from 'winston'

export default class Debugger extends EventEmitter {
  public level: number
  public levels: string[]

  constructor () {
    super()
    this.levels = [
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'silly'
    ]
    this.level = this.getLevelFromName('warn')
  }

  private isLevel (level: string): boolean {
    return this.getLevelFromName(level) <= this.level
  }

  public linkLogger (loggerObj: logger.Logger): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.on('all', (args: any[]) => {
      const level: string = args[-1]
      args = args.pop()
      switch (level) {
        case 'silly':
          loggerObj.silly(args)
          break
        case 'debug':
          loggerObj.debug(args)
          break
        case 'info':
          loggerObj.info(args)
          break
        case 'warn':
          loggerObj.warn(args)
          break
        case 'error':
          loggerObj.error(args)
          break
        case 'fatal':
          loggerObj.error(args)
          break
      }
    })
  }

  public getLevelFromName (name: string): number {
    const calculated = this.levels.indexOf(name.toLowerCase())
    return calculated !== -1 ? calculated : 2
  }

  public writeDebug (level: string, ...data: any[]): void {
    this.emit(level, data)
    if (this.isLevel(level)) {
      data.push(level)
      this.emit('all', data)
    }
  }

  public fatal (...data: any[]): void {
    this.writeDebug('fatal', data)
  }

  public error (...data: any[]): void {
    this.writeDebug('error', data)
  }

  public warn (...data: any[]): void {
    this.writeDebug('warn', data)
  }

  public info (...data: any[]): void {
    this.writeDebug('info', data)
  }

  public debug (...data: any[]): void {
    this.writeDebug('debug', data)
  }

  public silly (...data: any[]): void {
    this.writeDebug('silly', data)
  }
}
