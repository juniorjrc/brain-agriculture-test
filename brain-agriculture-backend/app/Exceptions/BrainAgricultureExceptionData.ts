import { Exception } from "@adonisjs/core/build/standalone"

export default class BrainAgricultureExceptionData {
    public code: string
    public message: string
    public status: number
    public timestamp: string
  
    constructor(exception: Exception, status: number) {
        this.code = exception.code ?? 'INTERNAL_SERVER_ERROR'
        this.message = exception.message || 'Unknown error occurred'
        this.status = status || 500
        this.timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
    }
  }