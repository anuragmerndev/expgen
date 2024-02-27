export type packageManager = 'npm' | 'yarn' | 'pnpm';

export const checkPackageManager = (): packageManager => {
    const packageAgent = process.env.npm_config_user_agent || '';

    if (packageAgent.includes('npm')) {
        return 'npm';
    }

    if (packageAgent.includes('yarn')) {
        return 'yarn';
    }

    if (packageAgent.includes('pnpm')) {
        return 'pnpm';
    }

    return 'npm';
}