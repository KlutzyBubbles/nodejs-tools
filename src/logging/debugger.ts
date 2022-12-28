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
    // To remove unwanted process killing if logger isnt attached
    this.on('error', () => {})
  }

  private isLevel (level: string): boolean {
    return this.getLevelFromName(level) <= this.level
  }

  public linkLogger (loggerObj: logger.Logger): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.on('all', (message: any, args: any[]) => {
      const level: string = args[args.length - 1]
      args = args.pop()
      switch (level) {
        case 'silly':
          loggerObj.silly(message, args)
          break
        case 'debug':
          loggerObj.debug(message, args)
          break
        case 'info':
          loggerObj.info(message, args)
          break
        case 'warn':
          loggerObj.warn(message, args)
          break
        case 'error':
          loggerObj.error(message, args)
          break
        case 'fatal':
          loggerObj.error(message, args)
          break
      }
    })
  }

  public getLevelFromName (name: string): number {
    const calculated = this.levels.indexOf(name.toLowerCase())
    return calculated !== -1 ? calculated : 2
  }

  public writeDebug (level: string, message: any, ...data: any[]): void {
    this.emit(level, message, data)
    if (this.isLevel(level)) {
      (data).push(level)
      this.emit('all', message, data)
    }
  }

  public fatal (message: any, ...data: any[]): void {
    this.writeDebug('fatal', message, data)
  }

  public error (message: any, ...data: any[]): void {
    this.writeDebug('error', message, data)
  }

  public warn (message: any, ...data: any[]): void {
    this.writeDebug('warn', message, data)
  }

  public info (message: any, ...data: any[]): void {
    this.writeDebug('info', message, data)
  }

  public debug (message: any, ...data: any[]): void {
    this.writeDebug('debug', message, data)
  }

  public silly (message: any, ...data: any[]): void {
    this.writeDebug('silly', message, data)
  }
}
