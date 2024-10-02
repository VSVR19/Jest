import { calculateStringComplexity, 
  toUpperCaseWithCallback, 
  StringUtils } 
from "../../app/doubles/OtherUtils"

describe('OtherUtils test suite', () => {

  // STUBS
  it('calculates complexity', () => {    
    // The calculateStringComplexity method only uses 2 keys of the stringInfo.
    // So, its enough if we add only those 2 keys in this someInfo object.

    // Therefore, this someInfo is a STUB.
    // A STUB is simply an incomplete object.
    // STUBS shouldnt be used inside assertions!
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'Monday',
        fields2: 'Tuesday',
      }
    }

    // ARRANGE.
    const expected = 10
    // ACT.
    // So to get rid of the TypeScript compilation error, CAST someInfo to any!
    // This gets rid of the type-checking and hence throws no errors!
    const actual = calculateStringComplexity(someInfo as any)
    // ASSERT.
    expect(actual).toBe(expected)
  })

  // FAKES
  it('toUpperCaseWithCallback calls the callback for an invalid argument', () => {
    // ARRANGE
    // const expected = undefined
    // ACT    
    // 2nd argument to toUpperCaseWithCallback is a FUNCTION with a STRING ARGUMENT
    
    // () => {} is a FAKE!
    const actual = toUpperCaseWithCallback('', () => {})
    // ASSERT
    expect(actual).toBeUndefined
  })

  // FAKES
  it('toUpperCaseWithCallback calls the callback for an valid argument', () => {
    // ARRANGE
    const expected = 'ABC'
    // ACT    
    // 2nd argument to toUpperCaseWithCallback is a FUNCTION with a STRING ARGUMENT
    
    // () => {} is a FAKE!
    const actual = toUpperCaseWithCallback('abc', () => {})
    // ASSERT
    expect(actual).toBe(expected)
  })
})

// MOCKS.
describe('Tracking callbacks using MOCKS', () => {
  // This is a MOCK jest function!
  const mockCallback = jest.fn()

  // This clearAllMocks will clear the mocks after every test.
  // Therefore, toHaveBeenCalledTimes will be correct.
  // If not, toHaveBeenCalledTimes will add all the calls ever made to the mockCallback!
  afterEach(() => jest.clearAllMocks())

  it('calls the callback function when an invalid argument is passed', () => {
    // ARRANGE
    // ACT
    
    // Wow. working with the  mockCallback is noice!
    const actual = toUpperCaseWithCallback('', mockCallback)
    // ASSERT
    expect(actual).toBeUndefined()
    expect(mockCallback).toHaveBeenCalledWith('Invalid argument')
    expect(mockCallback).toHaveBeenCalledTimes(1)
  });

  it('calls the callback function when valid argument is passed', () => {
    // ARRANGE
    // ACT    
    // Wow. working with the  mockCallback is noice!
    const actual = toUpperCaseWithCallback('abc', mockCallback)
    // ASSERT
    expect(actual).toBe('ABC')
    expect(mockCallback).toHaveBeenCalledWith('Called function with abc')
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})

// SPIES! :-O A little confusing
describe('StringUtils test suite using spies', () => {

  // A VARIABLE has the TYPE of a CLASS!
  // This is strange!  
  let sut: StringUtils

  // A NEW OBJECT for every test in this describe block.
  // This makes the individual tests independent
  beforeEach(() => sut = new StringUtils())

  it('uses a spy to track calls to the toUpperCase method in the StringUtils class', () => {
    // ARRANGE
    // The sut, StringUtils class has 2 methods, were' testing the toUpperCase method here.
    const spyToUpperCase = jest.spyOn(sut, 'convertToUpperCase')
    // ACT
    sut.convertToUpperCase('abc')
    // ASSERT
    expect(spyToUpperCase).toHaveBeenCalledWith('abc')
  })

  it('uses a spy to track calls to the logger method in the StringUtils class', () => {
    // ARRANGE
    // The sut, StringUtils class has 2 methods, were' testing the logger method here.
    const spyLogger = jest.spyOn(sut, 'logger')    
    // ACT
    sut.logger('abc')
    // ASSERT
    expect(spyLogger).toHaveBeenCalledWith('abc')
  })

  it('uses a spy to track calls to the logger method in the StringUtils class', () => {
    // ARRANGE

    // This line is to test the console.log(arg) statement.
    // So instead of passing sut as the 1st argument, we pass console
    // log is one of the properties of the console
    const spyLogger = jest.spyOn(console, 'log')
    // ACT
    sut.logger('abc')
    // ASSERT
    expect(spyLogger).toHaveBeenCalledWith('abc')
  })

  it('uses a spy to track calls to the callExternalService method in the StringUtils class', () => {
    // ARRANGE    
    // We need to convert sut to any.
    // This is so that we can access the callExternalService private method.
    const spyCallExternalService = jest.spyOn(sut as any, 'callExternalService');
    // ACT
    // Again, sut is casted to any to access the callExternalService private method
    (sut as any).callExternalService()
    // ASSERT
    expect(spyCallExternalService).toHaveBeenCalled()
  })

  it('uses a spy to test the IMPLEMENTATION of the callExternalService method', () => {
    // ARRANGE
    const spyCallExternalService = jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
      console.log('Calling a mocked implementation');      
    });
    // ACT
    (sut as any).callExternalService()
    // ASSERT
    expect(spyCallExternalService).toHaveBeenCalledWith()
  })
})

// jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
  //   console.log('Calling the mock implementation of callExternalService');      
  // });
  