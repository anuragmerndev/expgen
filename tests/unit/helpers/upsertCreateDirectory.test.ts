import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync } from 'fs';
import { upsertCreateDirectory } from '../../../helpers/upsertCreateDirectory.js';

vi.mock('fs', () => ({
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
}));

vi.mock('../../../helpers/copyFileToDir.js', () => ({
    resolvePath: vi.fn((...paths: string[]) => paths.join('/')),
}));

describe('upsertCreateDirectory', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should create directory when it does not exist', async () => {
        vi.mocked(existsSync).mockReturnValue(false);

        await upsertCreateDirectory('/home', 'user', 'project');

        expect(existsSync).toHaveBeenCalledWith('/home/user/project');
        expect(mkdirSync).toHaveBeenCalledWith('/home/user/project');
    });

    it('should not create directory when it already exists', async () => {
        vi.mocked(existsSync).mockReturnValue(true);

        await upsertCreateDirectory('/home', 'user', 'existing');

        expect(existsSync).toHaveBeenCalledWith('/home/user/existing');
        expect(mkdirSync).not.toHaveBeenCalled();
    });

    it('should handle errors and exit process', async () => {
        const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
            throw new Error('Process exited');
        });
        const mockLog = vi.spyOn(console, 'log').mockImplementation(() => {});

        vi.mocked(existsSync).mockImplementation(() => {
            throw new Error('Permission denied');
        });

        await expect(upsertCreateDirectory('/restricted')).rejects.toThrow('Process exited');
        expect(mockExit).toHaveBeenCalledWith(1);

        mockExit.mockRestore();
        mockLog.mockRestore();
    });
});
