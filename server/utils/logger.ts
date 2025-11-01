/**
 * Simple logging utility for consistent logging across the application
 */

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private minLevel: LogLevel;

  constructor() {
    // Set minimum log level based on environment
    this.minLevel = process.env.NODE_ENV === "production"
      ? LogLevel.INFO
      : LogLevel.DEBUG;
  }

  private formatMessage(level: string, message: string, meta?: unknown): string {
    const timestamp = new Date().toISOString();
    let formatted = `[${timestamp}] [${level}] ${message}`;

    if (meta !== undefined) {
      formatted += ` ${JSON.stringify(meta)}`;
    }

    return formatted;
  }

  debug(message: string, meta?: unknown): void {
    if (this.minLevel <= LogLevel.DEBUG) {
      console.log(this.formatMessage("DEBUG", message, meta));
    }
  }

  info(message: string, meta?: unknown): void {
    if (this.minLevel <= LogLevel.INFO) {
      console.log(this.formatMessage("INFO", message, meta));
    }
  }

  warn(message: string, meta?: unknown): void {
    if (this.minLevel <= LogLevel.WARN) {
      console.warn(this.formatMessage("WARN", message, meta));
    }
  }

  error(message: string, error?: unknown): void {
    if (this.minLevel <= LogLevel.ERROR) {
      const errorMessage = error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
      console.error(this.formatMessage("ERROR", message, errorMessage));
    }
  }

  // Special method for HTTP request logging
  request(method: string, path: string, statusCode: number, duration: number, meta?: unknown): void {
    const message = `${method} ${path} ${statusCode} in ${duration}ms`;
    if (statusCode >= 500) {
      this.error(message, meta);
    } else if (statusCode >= 400) {
      this.warn(message, meta);
    } else {
      this.info(message, meta);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing or custom instances
export { Logger, LogLevel };
