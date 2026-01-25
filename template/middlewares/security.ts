import helmet from 'helmet';

/**
 * Security middleware using Helmet.js
 * Helps secure Express apps by setting various HTTP headers
 */
export const securityMiddleware = helmet({
    // Content Security Policy
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    // Prevent clickjacking
    frameguard: {
        action: 'deny',
    },
    // Hide X-Powered-By header
    hidePoweredBy: true,
    // HTTP Strict Transport Security
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    // Prevent MIME type sniffing
    noSniff: true,
    // Referrer Policy
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    // XSS Filter
    xssFilter: true,
});

/**
 * Minimal security configuration for development
 */
export const devSecurityMiddleware = helmet({
    contentSecurityPolicy: false, // Disable CSP in development
    hidePoweredBy: true,
    noSniff: true,
});
