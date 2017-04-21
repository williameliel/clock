/* Simple function to padd hours and minutes to a leading zero */

const Padder = (number) => number <= 10 ? `0${number}`.slice(-2) : number;

export default Padder;
