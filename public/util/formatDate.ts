const timeUnits = {
    second: 60000,
    minute: 60000 * 60,
    hour: 360000 * 60 * 24,
    day: 360000 * 60 * 24 * 30,
    month: 360000 * 60 * 24 * 30 * 12,
    //TODO: добавить годы
};

const convertTime = (unit: string, milliseconds: number) => {
    switch (unit) {
        case 'second':
            return Math.floor(milliseconds / 1000);
        case 'minute':
            return Math.floor(milliseconds / 60000);
        case 'hour':
            return Math.floor(milliseconds / (60 * 60 * 1000));
        case 'day':
            return Math.floor(milliseconds / (360000 * 60 * 24));
        case 'month':
            return Math.floor(milliseconds / (360000 * 60 * 24 * 30));
        default:
            return Math.floor(milliseconds / (360000 * 60 * 24 * 30 * 365));
    }
};

export const formatDate = (date: string) => {
    const d = new Date(date).getTime();
    const now = new Date().getTime();
    const diff = now - d;
    if (diff < 1000) {
        return 'right now';
    }
    for (const [unit, num] of Object.entries(timeUnits)) {
        if (diff > num) continue;
        const convertedDiff = convertTime(unit, diff);
        if (convertedDiff > 1) {
            return `${convertedDiff} ${unit}s ago`;
        }

        return `${convertedDiff} ${unit} ago`;
    }
};
