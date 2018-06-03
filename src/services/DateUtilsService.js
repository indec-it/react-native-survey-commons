import {isDate} from 'lodash';

export default class DateUtilsService {
    static LOCALE = 'es-AR';
    static TIMEZONE_UTC = 'UTC';

    static formatDate(input) {
        if (!input) {
            return '';
        }
        const date = isDate(input) ? input : new Date(input);
        return date.toLocaleDateString(DateUtilsService.LOCALE, {timeZone: DateUtilsService.TIMEZONE_UTC});
    }

    static formatTime(input) {
        if (!input) {
            return '';
        }
        const date = isDate(input) ? input : new Date(input);
        return date.toLocaleTimeString(DateUtilsService.LOCALE, {timeZone: DateUtilsService.TIMEZONE_UTC});
    }
}
