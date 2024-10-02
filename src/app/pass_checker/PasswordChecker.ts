enum PasswordErrors {
  SHORT = 'Password is too short!',
  NO_UPPER_CASE = 'Upper case letter required!',
  NO_LOWER_CASE = 'Lower case letter required!',
  NO_NUMERIC = 'Admin password must contain a numeric character'
}

interface CheckResult {
  valid: boolean,
  reasons: PasswordErrors[],
}

class PasswordChecker {
  // Look at the return type of this method.
  public checkPassword(password: string): CheckResult {
    // Reasons is an ARRAY OF THE TYPE PasswordErrors
    const reasons: PasswordErrors[] = []

    this.checkPasswordLength(password, reasons)
    this.checkUpperCaseLetter(password, reasons)
    this.checkLowerCaseLetter(password, reasons)

    // Look at this return value.
    // Its dependent on the TYPE of this METHOD.
    return {
      valid: reasons.length ? false: true,
      reasons,
    }
  }

  public checkAdminPassword(password: string): CheckResult {
    const reasons: PasswordErrors[] = []
    
    // Specifying type by using a colon when calling a method doesnt work!
    // const letterChecks = this.checkPassword(password: string)
    
    // Mentioning the type by using 'as' works!
    const letterChecks = this.checkPassword(password as string)
    this.checkForNumber(password, letterChecks.reasons)

    return {
      valid: letterChecks.reasons.length ? false : true,
      reasons: letterChecks.reasons,
    }    
  }

  private checkPasswordLength(password: string, reasons: PasswordErrors[]) {
    if(password.length <= 7) reasons.push(PasswordErrors.SHORT)    
  }

  private checkUpperCaseLetter(password: string, reasons: PasswordErrors[]) {
    // https://stackoverflow.com/questions/72580420/how-could-i-detect-if-there-is-an-uppercase-character-in-a-string
    if(password === password.toLowerCase()) reasons.push(PasswordErrors.NO_UPPER_CASE)
  }

  private checkLowerCaseLetter(password: string, reasons: PasswordErrors[]) {
    if(password === password.toUpperCase()) reasons.push(PasswordErrors.NO_LOWER_CASE)
  }

  private checkForNumber(password: string, reasons: PasswordErrors[]) {
    // https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
    if(!(/\d/.test(password))) reasons.push(PasswordErrors.NO_NUMERIC)
  }
}

export { PasswordChecker, PasswordErrors, CheckResult }
