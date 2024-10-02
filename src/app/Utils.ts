class StringUtils {
  public toUpperCase = (arg: string):string => {
    if (!arg) throw new Error("Invalid argument!")

    return toUpperCase(arg) 
  }
}

const toUpperCase = (arg: string): string => arg.toUpperCase()

type stringInfo = {
  lowerCase: string,
  upperCase: string,
  characters: string[],
  length: number,
  extraInfo: Object | undefined
}

const getStringInfo = (arg: string): stringInfo => ({
  lowerCase: arg.toLowerCase(),
  upperCase: arg.toUpperCase(),
  characters: Array.from(arg),
  length: arg.length,
  extraInfo: {}
})

export { toUpperCase, stringInfo, getStringInfo, StringUtils }
