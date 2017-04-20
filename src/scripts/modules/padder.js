/* Simple function to padd hours and minutes to a leading zero */
export default function Padder(number) {

    return number <= 10 ? `0${number}`.slice(-2) : number;
    
}