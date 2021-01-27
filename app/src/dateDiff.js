import locale from '@reuters-graphics/d3-locale';
let loc = new locale('es');

export const dateDiff = (start, end) => {
    const difference = end.getTime() - start.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
}

export const approxDate = (date) => {

    const day = (date.getDate() < 11)
    ? 'principios'
    : (date.getDate() >= 11 && date.getDate() <= 19)
    ? 'mediados'
    : 'finales'

    return `${day} de ${loc.formatTime('%B')(new Date(2021, date.getMonth(), 1))}`
}

export const sNumber = (n, g) => {
    const spell = [(g === 'f') ? 'ninguna' : 'ningún', (g === 'f') ? 'una' : 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    return (n < 10) ? spell[n] : n;
}