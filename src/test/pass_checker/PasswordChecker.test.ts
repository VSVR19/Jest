import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker"

describe('PasswordChecker test suite', () => {
  // How the type of sut is the class name itself?
  let sut: PasswordChecker

  /**
   * A new object for every test.
   * Helps in keeping tests independent
   */
  beforeEach(() => {
    sut = new PasswordChecker
  })

  it('Password with less than 8 characters is invalid', () => {
    // ARRANGE
    const expected = false
    
    // ACT
    const actual = sut.checkPassword('1234567')

    // ASSERT
    // No need to use expected here.
    // https://vincenttunru.com/toBeTruthy-vs-toBe-true/
    // expect(actual).toBeFalsy
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).toContain(PasswordErrors.SHORT)

  })

  it('Password with 8 or more than 8 characters is valid', () => {
    // ARRANGE
    const expected = true

    // ACT
    const actual = sut.checkPassword('1234567Aa')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
  })

  it('Password with no uppercase letter is invalid', () => {
    // ARRANGE
    const expected = false
    
    // ACT
    const actual = sut.checkPassword('1234abcd')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE)
  })

  it('Password with an uppercase letter is valid', () => {
    // ARRANGE
    const expected = true
    
    // ACT
    const actual = sut.checkPassword('1234abcD')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
  })

  it('Password with no lowercase letter is invalid', () => {
    // ARRANGE
    const expected = false
    
    // ACT
    const actual = sut.checkPassword('1234ABCD')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE)
  })

  it('Password with a lowercase letter is valid', () => {
    // ARRANGE
    const expected = true
    
    // ACT
    const actual = sut.checkPassword('1234ABCd')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
  })

  // https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript
  it('Admin password with a number is valid', () => {
    // ARRANGE
    const expected = true

    // ACT
    const actual = sut.checkAdminPassword('ABCDefg1')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE)
    expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMERIC)

  })

  it('Admin password without a number is invalid', () => {
    // ARRANGE
    const expected = false
    
    // ACT
    const actual = sut.checkAdminPassword('ABCDefgh')

    // ASSERT
    expect(actual.valid).toBe(expected)
    expect(actual.reasons).toContain(PasswordErrors.NO_NUMERIC)
  })
})
