declare global {
    interface Window {
        debug: boolean;
    }
}

export const LIB_NAME = 'Composer';

/**
 * Formatted console messages for the library
 * @param type Identifier for the message location
 * @param msg Message to send
 * @param args Javascript variables to pass to the console
 * @param out Output stream name for messages. Defaults to `'debug'`
 * @param color Secondary colour for type
 */
export function log(type: string, msg: string, args?: any, out: string = 'debug', color?: string) {
    if (window.debug) {
        const clr = color ? color : '#009688';
        const COLOURS = ['color: #0288D1', `color:${clr}`, 'color: default'];
        if (args) {
            if (hasColours()) {
                console[out](`%c[${LIB_NAME}]%c[${type}] %c${msg}`, ...COLOURS, args);
            } else {
                console[out](`[${LIB_NAME}][${type}] ${msg}`, args);
            }
        } else {
            if (hasColours()) {
                console[out](`%c[${LIB_NAME}]%c[${type}] %c${msg}`, ...COLOURS);
            } else {
                console[out](`[${LIB_NAME}][${type}] ${msg}`);
            }
        }
    }
}

/**
 * Log formatted error message
 * @param type Identifier for the message location
 * @param msg Message to send
 * @param args Javascript variables to pass to the console
 */
export function error(type: string, msg: string, args?: any) {
    log(type, msg, args, 'error');
}

/**
 * Log formatted version information for the library
 * @param version
 * @param build
 * @param out
 */
export function version(version: string, build: string, out: any = 'debug') {
    const COLOURS = ['color: #f44336', `color: #9c27b0`, 'color: default'];
    if (hasColours()) {
        console[out](`%c[ACA]%c[LIB] %c${LIB_NAME} - ${version} | ${build}`, ...COLOURS);
    } else {
        console[out](`[ACA][LIB] ${LIB_NAME} - ${version} | ${build}`);
    }
}

/**
 * Whether the browser console supports CSS colours
 */
export function hasColours() {
    const doc = document as any;
    return !(doc.documentMode || /Edge/.test(navigator.userAgent));
}
