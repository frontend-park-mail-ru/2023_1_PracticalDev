export const debounce = (func: Function, timeout = 300) => {
    let timer: number;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};


