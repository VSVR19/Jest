import { v4 } from "uuid"

type StringInfo = {
  lowerCase: string,
  upperCase: string,
  characters: string,
  length: number,
  extraInfo: Object | undefined
}

// This is a type, not a function.
type LoggerServiceCallback = (arg: string) => void

const calculateStringComplexity = (string: StringInfo): number => 
  Object.keys(string.extraInfo).length * string.length

const toUpperCaseWithCallback = (arg: string, callback: LoggerServiceCallback): string => {
  if (!arg) {
    // This wont call LoggerServiceCallback; LoggerServiceCallback is only a type.
    // Itll call the 2nd argument passed to the function.
    callback('Invalid argument')
    return
  }
  callback(`Called function with ${arg}`)
  return arg.toUpperCase()
}

class StringUtils {
  private callExternalService = (): void => console.log('Calling 911');
  public convertToUpperCase = (arg: string): string => arg.toUpperCase();
  public logger = (arg: string): void => console.log(arg);
}

const toUpperCase = (arg: string): string => arg.toUpperCase();
const toLowerCaseWithId = (arg: string): string => arg.toLowerCase() + v4(); 

export { 
  StringInfo, 
  calculateStringComplexity, 
  toUpperCaseWithCallback,
  StringUtils,
  toUpperCase,
  toLowerCaseWithId,
}
