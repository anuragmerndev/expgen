import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { existsSync, lstatSync, promises } from 'fs';
import { checkDirectoryExistsAndEmpty } from '../../../helpers/checkEmptyDirectory.js';

vi.mock('fs', () => ({
    existsSync: vi.fn(),
    lstatSync: vi.fn(),
    promises: {
        readdir: vi.fn(),
    },
}));

describe('checkDirectoryExistsAndEmpty', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should return false when directory does not exist', async () => {
        vi.mocked(existsSync).mockReturnValue(false);

        const result = await checkDirectoryExistsAndEmpty('/non-existent');

        expect(result).toBe(false);
        expect(existsSync).toHaveBeenCalledWith('/non-existent');
    });

    it('should return true when directory exists and is not empty', async () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(lstatSync).mockReturnValue({ isDirectory: () => true } as any);
        vi.mocked(promises.readdir).mockResolvedValue(['file1.txt', 'file2.txt'] as any);

        const result = await checkDirectoryExistsAndEmpty('/existing-dir');

        expect(result).toBe(true);
    });

    it('should return false when directory exists and is empty', async () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(lstatSync).mockReturnValue({ isDirectory: () => true } as any);
        vi.mocked(promises.readdir).mockResolvedValue([] as any);

        const result = await checkDirectoryExistsAndEmpty('/empty-dir');

        expect(result).toBe(false);
    });

    it('should return true when an error occurs', async () => {
        vi.mocked(existsSync).mockImplementation(() => {
            throw new Error('Permission denied');
        });

        const result = await checkDirectoryExistsAndEmpty('/error-dir');

        expect(result).toBe(true);
    });

    it('should return false when path is a file, not a directory', async () => {
        vi.mocked(existsSync).mockReturnValue(true);
        vi.mocked(lstatSync).mockReturnValue({ isDirectory: () => false } as any);
        vi.mocked(promises.readdir).mockResolvedValue([] as any);

        const result = await checkDirectoryExistsAndEmpty('/some-file.txt');

        expect(result).toBe(false);
    });
});
