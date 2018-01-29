export const ERROR_OCCURRED = 'ERROR_OCCURRED';

export function handleError(err) {
    return {type: ERROR_OCCURRED, err};
}
