export const debounce = (callback: () => void, wait: number): EventListener => {
    let timeout;

    return (...args: unknown[]): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(this, args), wait);
    };
};
