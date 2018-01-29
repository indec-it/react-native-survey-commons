/* eslint-disable import/prefer-default-export,no-console */
export function* handleError({err}) {
    yield console.error(err);
}
