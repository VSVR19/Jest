import { DataBase } from "../../../app/server_app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/server_app/model/AuthModel"

const insertMock = jest.fn()
const getByMock = jest.fn()

// jest.mock('../../../app/server_app/data/DataBase', () => {
//   return {
//     DataBase: {
//       insert: insertMock,
//       getBy: getByMock,
//     }
//   }
// })

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      }
    })
  }
})

const mockAccount: Account = {
    id: '1919',
    userName: 'blah',
    password: 'bluh',
}

const mockUserId  = '1999'

describe('UserCredentialsDataAccess test suite', () => {
  let sut: UserCredentialsDataAccess

  beforeEach(() => {
    sut = new UserCredentialsDataAccess()    
    expect(DataBase).toHaveBeenCalledTimes(1)
  })
  afterEach(() => jest.clearAllMocks())

  it('addUser method should add an user and return an id', async () => {
    insertMock.mockResolvedValueOnce(mockUserId)  
    
    const actual = await sut.addUser(mockAccount)
    expect(actual).toBe(mockUserId)
    expect(insertMock).toHaveBeenCalledWith(mockAccount)
  })

  it('getUserById method should return an users id', async () => {
    getByMock.mockResolvedValueOnce(mockAccount)

    const actual = await sut.getUserById('1919')
    expect(actual).toBe(mockAccount)
    expect(getByMock).toHaveBeenCalledWith('id', '1919')
  })

  it('getUserByUserName method should return an user name', async () => {
    getByMock.mockResolvedValueOnce(mockAccount)

    const actual = await sut.getUserByUserName('blah')
    expect(actual).toBe(mockAccount)
    expect(getByMock).toHaveBeenCalledWith('userName', 'blah')
  })
})
