import { setUserAgent } from './Request/useragent';
import { setCookieToken } from './YouTube/utils/cookie';

interface tokenOptions {
    youtube?: {
        cookie: string;
    };
    useragent?: string[];
}
/**
 * Sets
 *
 *  i> YouTube :- cookies.
 *
 *  ii> Useragents :- array of string.
 *
 * locally in memory.
 *
 * Example :
 * ```ts
 * play.setToken({
 *      youtube : {
 *          cookie : "Your Cookies"
 *      }
 * }) // YouTube Cookies
 *
 * play.setToken({
 *      useragent: ['Your User-agent']
 * }) // Use this to avoid 429 errors.
 * ```
 * @param options {@link tokenOptions}
 */
export async function setToken(options: tokenOptions) {
    if (options.youtube) setCookieToken(options.youtube);
    if (options.useragent) setUserAgent(options.useragent);
}
