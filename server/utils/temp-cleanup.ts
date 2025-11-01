import fs from "fs/promises";
import path from "path";
import { logger } from "./logger";

const TEMP_DIR = path.join(process.cwd(), "temp-uploads");
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Clean up temporary files older than MAX_AGE
 */
async function cleanupTempFiles(): Promise<void> {
  try {
    // Ensure temp directory exists
    await fs.mkdir(TEMP_DIR, { recursive: true });

    const files = await fs.readdir(TEMP_DIR);
    const now = Date.now();
    let deletedCount = 0;

    for (const file of files) {
      const filePath = path.join(TEMP_DIR, file);

      try {
        const stats = await fs.stat(filePath);

        // Delete files older than MAX_AGE
        if (now - stats.mtimeMs > MAX_AGE) {
          await fs.unlink(filePath);
          deletedCount++;
          logger.debug(`Deleted old temp file: ${file}`, { age: now - stats.mtimeMs });
        }
      } catch (error) {
        logger.warn(`Failed to process temp file: ${file}`, error);
      }
    }

    if (deletedCount > 0) {
      logger.info(`Cleaned up ${deletedCount} temporary files`);
    }
  } catch (error) {
    logger.error("Error during temp file cleanup", error);
  }
}

/**
 * Start the automatic cleanup scheduler
 */
export function startTempCleanup(): void {
  // Run cleanup immediately on startup
  cleanupTempFiles();

  // Schedule periodic cleanup
  const intervalId = setInterval(cleanupTempFiles, CLEANUP_INTERVAL);

  // Cleanup on process exit
  process.on("SIGINT", () => {
    clearInterval(intervalId);
    cleanupTempFiles().then(() => {
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    clearInterval(intervalId);
    cleanupTempFiles().then(() => {
      process.exit(0);
    });
  });

  logger.info("Temporary file cleanup scheduler started", {
    interval: CLEANUP_INTERVAL / 1000 / 60,
    maxAge: MAX_AGE / 1000 / 60 / 60,
  });
}
