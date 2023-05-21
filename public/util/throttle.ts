export const throttle = (func: Function, delay = 300) => {
    let prev = 0;
    return (...args: any[]) => {
        let now = new Date().getTime();
        if (now - prev > delay) {
            prev = now;
            return func(...args);
        }
    };
};
