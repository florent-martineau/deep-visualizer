import { Config, defineConfig } from 'orval';
import { FRONT_OPENAPI_GENERATED_FILE_PATH } from './shared/constants';

export const getOrvalConfig: (target: string) => Config = (target) => ({
  'openapi': {
    input: 'api/openapi.json',
    output: {
      target,
      client: 'react-query',
      baseUrl: 'http://localhost:8000'
    },
  },
})

export default defineConfig(getOrvalConfig(FRONT_OPENAPI_GENERATED_FILE_PATH))