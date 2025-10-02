import { defineConfig } from 'orval';

export default defineConfig({
  'openapi': {
    input: 'api/openapi.json',
    output: {
      target: 'front/src/api.ts',
      client: 'react-query',
    },
  },
})