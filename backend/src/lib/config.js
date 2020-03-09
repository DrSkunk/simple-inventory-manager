import productionConfig from '../../config.json';
import testConfig from '../../test/config.json';

let config = productionConfig;

if (process.env.NODE_ENV === 'test') {
  console.log('Using test config');
  config = testConfig;
}

console.log('Using config values', config);
export default config;
