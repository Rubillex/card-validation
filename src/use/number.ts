export function useNumberDelimiter(number: number, delimiter: string = ' ') {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}