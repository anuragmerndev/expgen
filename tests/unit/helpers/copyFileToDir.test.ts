import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { copyFileToDir, resolvePath } from '../../../helpers/copyFileToDir.js';

vi.mock('fs', () => ({
    copyFileSync: vi.fn(),
}));

vi.mock('path', () => ({
    resolve: vi.fn((...paths: string[]) => paths.join('/')),
}));

describe('copyFileToDir', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should copy file from source to destination', async () => {
        vi.mocked(copyFileSync).mockImplementation(() => {});

        await copyFileToDir('/src/file.txt', '/dest/file.txt');

        expect(copyFileSync).toHaveBeenCalledWith('/src/file.txt', '/dest/file.txt');
    });

    it('should handle copy errors gracefully', async () => {
        const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
            throw new Error('Process exited');
        });
        const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        vi.mocked(copyFileSync).mockImplementation(() => {
            throw new Error('Copy failed');
        });

        await expect(copyFileToDir('/src/file.txt', '/dest/file.txt')).rejects.toThrow('Process exited');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockLog.mockRestore();
    });
});

describe('resolvePath', () => {
    it('should resolve multiple path segments', () => {
        vi.mocked(resolve).mockReturnValue('/home/user/project/src');

        const result = resolvePath('/home', 'user', 'project', 'src');

        expect(resolve).toHaveBeenCalledWith('/home', 'user', 'project', 'src');
    });

    it('should resolve single path', () => {
        vi.mocked(resolve).mockReturnValue('/home/user');

        const result = resolvePath('/home/user');

        expect(resolve).toHaveBeenCalledWith('/home/user');
    });
});
