export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH28 = 28 * DAY;
export const MONTH29 = 29 * DAY;
export const MONTH30 = 30 * DAY;
export const MONTH31 = 31 * DAY;
export const YEAR = 365 * DAY;

export function printableElapsedTime(timestamp: number, now: number = Date.now()): string {
    const diff = now >= timestamp
        ? new Date(now - timestamp)
        : new Date(timestamp - now)
        ;
    const pluralize = (s: string, num: number) => num > 1 ? s + 's' : s;

    const years = diff.getUTCFullYear() - 1970;
    if (years > 0) {
        return `${years} ${pluralize('year', years)}`;
    }

    const months = diff.getUTCMonth();
    if (months > 0) {
        return `${months} ${pluralize('month', months)}`;
    }

    const days = diff.getUTCDate() - 1;
    if (days >= 7) {
        const weeks = Math.floor(days / 7);
        return `${weeks} ${pluralize('week', weeks)}`;
    }
    if (days > 0) {
        return `${days} ${pluralize('day', days)}`;
    }

    const hours = diff.getUTCHours();
    if (hours > 0) {
        return `${hours} ${pluralize('hour', hours)}`;
    }

    const minutes = diff.getUTCMinutes();
    if (minutes > 0) {
        return `${minutes} ${pluralize('minute', minutes)}`;
    }

    return 'few seconds';
}

export async function asyncSleep(timeoutMillis: number) {
    return new Promise<number>((resolve, reject) => {
        if (timeoutMillis > 0) {
            setTimeout(() => resolve(timeoutMillis), timeoutMillis);
        } else {
            resolve(0)
        }
    });
}
