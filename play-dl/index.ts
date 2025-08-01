import {
    playlist_info,
    video_basic_info,
    video_info,
    decipher_info,
    yt_validate,
    extractID,
    YouTube,
    YouTubeChannel,
    YouTubePlayList,
    YouTubeVideo,
    InfoData
} from './YouTube';
import { setToken } from './token';

import { createInterface } from 'node:readline';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

/**
 * Validates url that play-dl supports.
 *
 * - `yt` - YouTube
 * @param url URL
 * @returns
 * ```ts
 * 'yt_video' | 'yt_playlist' | 'search' | false
 * ```
 */
async function validate(url: string): Promise<'yt_video' | 'yt_playlist' | 'search' | false> {
    let check;
    const url_ = url.trim();
    if (!url_.startsWith('https')) return 'search';
    check = yt_validate(url_);
    return check !== false ? (('yt_' + check) as 'yt_video' | 'yt_playlist') : false;
}
/**
 * Authorization interface for Spotify, SoundCloud and YouTube.
 *
 * Either stores info in `.data` folder or shows relevant data to be used in `setToken` function.
 *
 * ```ts
 * const play = require('play-dl')
 *
 * play.authorization()
 * ```
 *
 * Just run the above command and you will get a interface asking some questions.
 */
function authorization(): void {
    const ask = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    ask.question('Do you want to save data in a file ? (Yes / No): ', (msg) => {
        let file: boolean;
        if (msg.toLowerCase() === 'yes') file = true;
        else if (msg.toLowerCase() === 'no') file = false;
        else {
            console.log("That option doesn't exist. Try again...");
            ask.close();
            return;
        }
        ask.question('Choose your service - yo (for YouTube): ', (msg) => {
            if (msg.toLowerCase().startsWith('yo')) {
                if (!file) {
                    console.log('You already had cookie, just paste that in setToken function.');
                    ask.close();
                    return;
                }
                ask.question('Cookies : ', (cook: string) => {
                    if (!cook || cook.length === 0) {
                        console.log("You didn't provide a cookie. Try again...");
                        ask.close();
                        return;
                    }
                    if (!existsSync('.data')) mkdirSync('.data');
                    console.log('Cookies has been added successfully.');
                    let cookie: Object = {};
                    cook.split(';').forEach((x) => {
                        const arr = x.split('=');
                        if (arr.length <= 1) return;
                        const key = arr.shift()?.trim() as string;
                        const value = arr.join('=').trim();
                        Object.assign(cookie, { [key]: value });
                    });
                    writeFileSync('.data/youtube.data', JSON.stringify({ cookie }, undefined, 4));
                    ask.close();
                });
            } else {
                console.log("That option doesn't exist. Try again...");
                ask.close();
            }
        });
    });
}

// Export Main Commands
export {
    YouTubeChannel,
    YouTubePlayList,
    YouTubeVideo,
    authorization,
    decipher_info,
    extractID,
    playlist_info,
    setToken,
    validate,
    video_basic_info,
    video_info,
    yt_validate,
    InfoData
};

// Export Types
export { YouTube };

// Export Default
export default {
    YouTubeChannel,
    YouTubePlayList,
    YouTubeVideo,
    authorization,
    decipher_info,
    extractID,
    playlist_info,
    setToken,
    validate,
    video_basic_info,
    video_info,
    yt_validate
};
