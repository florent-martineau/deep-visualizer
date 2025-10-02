import fs from 'fs/promises';
import { generate } from 'orval';
import { getOrvalConfig } from 'orval.config';
import os from 'os';
import path from 'path';
import { FRONT_OPENAPI_GENERATED_FILE_PATH } from 'shared/constants';
import ts from 'typescript';
import { describe, expect, onTestFinished, test } from 'vitest';

describe('OpenAPI codegen', () => {
    test('Generated file should be up to date', async () => {
        const expectedOutputPath = path.join(os.tmpdir(), `api-test.ts`)
        const config = getOrvalConfig(expectedOutputPath)
        
        onTestFinished(async () => {
            await fs.unlink(expectedOutputPath)
        })

        await generate(config.openapi)

        const existing = await fs.readFile(FRONT_OPENAPI_GENERATED_FILE_PATH, 'utf-8')
        const expected = await fs.readFile(expectedOutputPath, 'utf-8')

        const parseTypeScript = (code: string) => {
            return ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true)
        }
        
        const existingAst = parseTypeScript(existing)
        const expectedAst = parseTypeScript(expected)
        
        expect(expectedAst).toEqual(existingAst)
    })
})