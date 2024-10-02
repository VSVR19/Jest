import { Account, SessionToken } from "../../../app/server_app/model/AuthModel";
import { DataBase } from "../../../app/server_app/data/DataBase";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";

const insertMock = jest.fn()
const updateMock = jest.fn()
const getByMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase', () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        update: updateMock,
        getBy: getByMock,
      }
    })
  }
})

const mockAccount: Account = {
    id: '999',
    userName: 'blah',
    password: 'bluh',
}

const mockSessionToken: SessionToken = {
    id: 'ST123',
    userName: 'admin',
    valid: true,
    expirationDate: new Date(1000 * 60 * 60)
}

describe('SessionTokenDataAccess test suite', () => {
  let sut: SessionTokenDataAccess

  beforeEach(() => {
    sut = new SessionTokenDataAccess()
    expect(DataBase).toHaveBeenCalledTimes(1)

    jest.spyOn(global.Date, 'now').mockReturnValue(0)
  })

  afterEach(() => jest.clearAllMocks())

  it('generateToken should return a token', async () => {
    const spyLogger = jest.spyOn(console, 'log')
    insertMock.mockResolvedValueOnce('111')

    const received = await sut.generateToken(mockAccount)
    expect(received).toEqual('111')
    expect(insertMock).toHaveBeenCalledTimes(1)
    expect(insertMock).toHaveBeenCalledWith({
      id: '',
      userName: mockAccount.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60)
    })
    expect(spyLogger).toHaveBeenCalledWith(`Inserting ${111} into the database`)
  })

  it('invalidateToken should update a token', async () => {
    await sut.invalidateToken('222')
    expect(updateMock).toHaveBeenCalledWith('222', 'valid', false)
  })

  it('isValidToken should return true if a token is valid ', async () => {
    const spyLogger = jest.spyOn(console, 'log')
    getByMock.mockResolvedValueOnce(mockSessionToken)

    const received = await sut.isValidToken(mockSessionToken.id)
    expect(received).toBe(true)
    expect(getByMock).toHaveBeenCalledWith('id', mockSessionToken.id)
    expect(spyLogger).toHaveBeenCalledWith(`Quering for ${mockSessionToken.id} into the database`)
  })

  it('isValidToken should return false if a token is invalid ', async () => {
    getByMock.mockResolvedValueOnce('')

    const received = await sut.isValidToken(mockSessionToken.id)
    expect(received).toBe(false)
    expect(getByMock).toHaveBeenCalledWith('id', mockSessionToken.id)
  })
})
