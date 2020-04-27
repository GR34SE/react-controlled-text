export const debounce = (callback, wait): EventListener => {
    let timeout;

    return (...args): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), wait);
    };
};
