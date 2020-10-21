import App from './providers/app';

/**
 * Load Configuration
 */
App.loadConfiguration();

/**
 * Run the Database pool
 */
App.loadDatabase();

/**
 * Run the Server on Clusters
 */
App.loadServer();
