# Deep Visualizer

[![codecov](https://codecov.io/gh/florent-martineau/deep-visualizer/branch/main/graph/badge.svg)](https://codecov.io/gh/florent-martineau/deep-visualizer)

## Codebase

### OpenAPI

The API exports an OpenAPI specification in a json file ([api/openapi.json](api/openapi.json)).

This OpenAPI spec is used by [Orval](https://orval.dev/) to generate types, hooks and more, automatically. Generated files can be found in [front/src/api.ts](front/src/api.ts).

To generate files, run: `bun run orval`

## Contribute

### Pre-commit hook

A pre-commit hook enables you to perform some tasks before committing, e.g. running a linter. More information [here](https://pre-commit.com/).

In order to install the pre-commit hook:

1. Start a devbox shell at the root of the repo: `devbox shell`
1. Starting the shell will install the pre-commit hook automatically

Now, everytime you commit some tasks will run, catching bugs even before it reaches the CI!
