/* Simple function to padd hours and minutes to a leading zero */
export default function padder(number){
  return number<=10 ? `0${number}`.slice(-2) : number;
}
