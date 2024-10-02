// https://stackoverflow.com/questions/72223232/number-matcher-error-even-though-values-are-of-type-number
// https://workplace.stackexchange.com/questions/198490/how-can-i-handle-an-ambitious-colleague-promoted-ahead-of-me-that-is-self-serv

import { toUpperCase, getStringInfo, StringUtils } from "../app/Utils";

describe('Utils test suite', () => {
  
  describe('StringUtils class tests', () => {
    let sut
    beforeEach(() => {
      // A new object for every test in this describe block.
      // This makes the individual tests independent
      sut = new StringUtils
    })

    it('should return correct uppercase', () => {
      // ARRANGE      
      const expected = 'ABC'

      // ACT
      const actual = sut.toUpperCase('abc')

      // ASSERT
      expect(actual).toBe(expected)
    })

    it('should throw an error on an invalid argument', () => {
      // ARRANGE
      // ACT
      // ASSERT

      // In Jest, to test error throwing,  new test functions must be created.
      const expectError = () => {
        const actual = sut.toUpperCase('')
      }
      expect(expectError).toThrow('Invalid argument!')
    })

    it('should throw an error on an invalid argument', () => {
      // Such a complicated syntax!
      expect(() => {
        sut.toUpperCase('')
      }).toThrow('Invalid argument!')
    })

    it('should throw an error on an invalid argument', (done) => {
      // This is the syntax I prefer.
      // Simple& clean
      try {
        sut.toUpperCase('')
        done('The getStringInfo method should fail, even if doesnt return any error object or error message')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error).toHaveProperty('message', 'Invalid argument!')
        // Dont forget to call done once youre 'done' with testing!
        done()
      }
    })
  })

  it('should return the uppercase of a valid string', () => {
    // ARRANGE
    const sut = toUpperCase
    const expected = 'ABC'

    // ACT
    const actual = sut('abc')

    // ASSERT
    expect(actual).toBe(expected);
  })

  describe('toUpperCase example', () => {
    it.each([
      { input: 'abc', output: 'ABC' },
      { input: 'blah', output: 'BLAH' },
      { input: 'bluh', output: 'BLUH' },
    ])('$input toUpperCase should be $output', ({ input, output }) => {
      // ARRANGE
      const sut = toUpperCase

      // ACT
      const actual = sut(input)

      // ASSERT- FIRST OUTPUT, AND THEN INPUT.
      // ASSERT- FIRST OUTPUT, AND THEN INPUT.
      // ASSERT- FIRST OUTPUT, AND THEN INPUT.
      expect(actual).toBe(output)
    })
  })

  describe('getStringInfo function for argument My-String should', () => {
    // ARRANGE
    const sut = getStringInfo

    // ACT
    const actual = sut('My-String')

    it('should return the right lowercase', () => {
      expect(actual.lowerCase).toBe('my-string')    
    })

    it('should return the right uppercase', () => {
      // When comparing primitive types, use toBe.
      expect(actual.upperCase).toBe('MY-STRING')
    })

    it('return right length', () => {
      // ASSERT
      // https://stackoverflow.com/questions/72223232/number-matcher-error-even-though-values-are-of-type-number
      expect(actual).toHaveLength('My-String'.length)    
    })

    it('should return an array of characters', () => {
      // When comparing objects, use toEqual.
      expect(actual.characters).toEqual(Array.from('My-String'))
    })

    it('should contain the correct characters in the returned array', () => {
      // When comparing objects, use toEqual.
      // Check for a single array element.
      expect(actual.characters).toContain<string>('M')

      // Check for an array in any order. 
      expect(actual.characters).toEqual(
      expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-',])
    )
    })

    it('return extraObject object and not undefined', () => {
      // When comparing objects, use toEqual.
      expect(actual.extraInfo).toEqual({})

      // Checks for UNDEFINED!
      expect(actual.extraInfo).toBeDefined();
      expect(actual.characters).toBeTruthy();
      expect(actual.characters).not.toBeUndefined
      expect(actual.extraInfo).not.toBe(undefined);
    })
  })
})
