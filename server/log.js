import fontColors from './color.js';

const info = (message, data) => {
    console.log(fontColors.get('blue'), 'INF:', fontColors.get('white'), message, fontColors.get('gray'), data, fontColors.get('white'));
};

const warn = (message, data) => {
    console.log(fontColors.get('yellow'), 'WRN:', fontColors.get('white'), message, fontColors.get('gray'), data, fontColors.get('white'));
};

const err = (message, data) => {
    console.log(fontColors.get('red'), 'ERR:', fontColors.get('white'), message, fontColors.get('gray'), data, fontColors.get('white'));
};

let debug = () => {};

if (process.env.DEBUG) {
    debug = (message, data) => {
        console.log(fontColors.get('black'), 'DEB:', fontColors.get('white'), message, fontColors.get('gray'), data, fontColors.get('white'));
    };
}

export { info, warn, err, debug };
