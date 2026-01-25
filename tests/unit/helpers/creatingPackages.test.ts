import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { writeFileSync } from 'fs';
import { creatingPackages } from '../../../helpers/creatingPackages.js';
import type { StructureOptions } from '../../../helpers/getUserPreference.js';

vi.mock('fs', () => ({
    writeFileSync: vi.fn(),
}));

vi.mock('../../../helpers/copyFileToDir.js', () => ({
    resolvePath: vi.fn((...paths: string[]) => paths.join('/')),
}));

describe('creatingPackages', () => {
    let capturedPackageJson: any;

    beforeEach(() => {
        vi.clearAllMocks();
        capturedPackageJson = null;

        vi.mocked(writeFileSync).mockImplementation((path, data) => {
            if (typeof path === 'string' && path.includes('package.json')) {
                capturedPackageJson = JSON.parse(data.toString());
            }
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    const basePreferences: StructureOptions = {
        db: 'nosql',
        eslint: false,
        val: false,
        logging: true,
        hooks: false,
        docker: false,
        cors: false,
    };

    it('should create basic package.json with required dependencies', async () => {
        await creatingPackages(basePreferences, '/project', 'my-project');

        expect(capturedPackageJson).toBeDefined();
        expect(capturedPackageJson.name).toBe('my-project');
        expect(capturedPackageJson.version).toBe('1.0.0');
        expect(capturedPackageJson.dependencies.express).toBeDefined();
        expect(capturedPackageJson.dependencies.winston).toBeDefined();
        expect(capturedPackageJson.dependencies.dotenv).toBeDefined();
    });

    it('should include security dependencies (helmet and rate-limit) by default', async () => {
        await creatingPackages(basePreferences, '/project', 'my-project');

        expect(capturedPackageJson.dependencies.helmet).toBe('^7.1.0');
        expect(capturedPackageJson.dependencies['express-rate-limit']).toBe('^7.2.0');
    });

    it('should add cors dependency when cors option is enabled', async () => {
        const prefs = { ...basePreferences, cors: true };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.dependencies.cors).toBe('^2.8.5');
        expect(capturedPackageJson.devDependencies['@types/cors']).toBe('^2.8.17');
    });

    it('should add eslint dependencies when eslint option is enabled', async () => {
        const prefs = { ...basePreferences, eslint: true };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.devDependencies.eslint).toBeDefined();
        expect(capturedPackageJson.devDependencies.prettier).toBeDefined();
        expect(capturedPackageJson.devDependencies['@typescript-eslint/eslint-plugin']).toBeDefined();
        expect(capturedPackageJson.scripts.lint).toBeDefined();
        expect(capturedPackageJson.scripts.format).toBeDefined();
    });

    it('should add husky and commitlint when hooks option is enabled', async () => {
        const prefs = { ...basePreferences, hooks: true };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.devDependencies.husky).toBeDefined();
        expect(capturedPackageJson.devDependencies['lint-staged']).toBeDefined();
        expect(capturedPackageJson.devDependencies['@commitlint/cli']).toBeDefined();
        expect(capturedPackageJson.scripts.prepare).toBe('husky');
    });

    it('should add zod dependency when validation option is enabled', async () => {
        const prefs = { ...basePreferences, val: true };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.dependencies.zod).toBe('^3.22.4');
    });

    it('should add prisma dependency and scripts for SQL database', async () => {
        const prefs = { ...basePreferences, db: 'sql' };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.dependencies.prisma).toBe('5.13.0');
        expect(capturedPackageJson.scripts['prisma:generate']).toBe('prisma generate');
        expect(capturedPackageJson.scripts['prisma:migrate']).toBe('prisma migrate dev');
        expect(capturedPackageJson.scripts['prisma:studio']).toBe('prisma studio');
    });

    it('should add mongoose dependency for NoSQL database', async () => {
        const prefs = { ...basePreferences, db: 'nosql' };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.dependencies.mongoose).toBe('^8.2.2');
    });

    it('should include start:prod script with correct path for SQL', async () => {
        const prefs = { ...basePreferences, db: 'sql' };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.scripts['start:prod']).toBe(
            'cross-env NODE_ENV=production node dist/src/server.js'
        );
    });

    it('should include start:prod script with correct path for NoSQL', async () => {
        const prefs = { ...basePreferences, db: 'nosql' };

        await creatingPackages(prefs, '/project', 'my-project');

        expect(capturedPackageJson.scripts['start:prod']).toBe(
            'cross-env NODE_ENV=production node dist/server.js'
        );
    });
});
