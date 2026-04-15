import { execSync } from 'child_process';

/**
 * WordPress database utilities for e2e testing
 */

/**
 * Reset the wp-env database to a clean state
 * Warning: This will delete all data and reinstall WordPress
 */
export function resetDatabase(): void {
  console.log('Resetting wp-env database...');
  try {
    execSync('wp-env reset', { stdio: 'inherit' });
    console.log('Database reset complete');
  } catch (error) {
    console.error('Failed to reset database:', error);
    throw error;
  }
}
