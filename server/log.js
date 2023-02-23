import fontColors from './color.js';

const info = (message, data) => {
    console.log(fontColors.get('blue'), 'INF:', fontColors.get('white'), message, fontColors.get('gray'), data);
};

const warn = (message, data) => {
    console.log(fontColors.get('yellow'), 'WRN:', fontColors.get('white'), message, fontColors.get('gray'), data);
};

const err = (message, data) => {
    console.log(fontColors.get('red'), 'ERR:', fontColors.get('white'), message, fontColors.get('gray'), data);
};

const debug = (message, data) => {
    console.log(fontColors.get('black'), 'DEB:', fontColors.get('white'), message, fontColors.get('gray'), data);
};

export { info, warn, err, debug };

