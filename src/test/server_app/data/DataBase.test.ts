import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type mockObjectWithId = {
  id: string,
  mockKey1: string,
  mockKey2: string,
}

describe('Database test suite', () => {
  let sut: DataBase<mockObjectWithId>
  
  const mockRandomId = '1234';
  
  const mockData1 = {
    id: '1919',
    mockKey1: 'blah',
    mockKey2: 'bluh',
  }
  
  const mockData2 = {
    id: '2020',
    mockKey1: 'blah',
    mockKey2: 'wow',
  }
  
  beforeEach(() => {
    sut = new DataBase<mockObjectWithId>()
    
    // jest.mock('../../../app/server_app/data/IdGenerator', () => ({
    //   generateRandomId: () => mockRandomId
    // }));

    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(mockRandomId)
  })

  it('should insert an object in the database', async () => {
    const actual = await sut.insert(
      { id: '' } as any
    )

    expect(actual).toBe('1234')
  })

  it('getBy method should return the queried object', async () => {
    const Id = await sut.insert(mockData1)
    const actual = await sut.getBy('id', Id);

    expect(actual).toBe(mockData1)
  })

  it('findAllBy method should return an array of all the queried objects', async () => {
    await sut.insert(mockData1)
    await sut.insert(mockData2)

    const expected = [mockData1, mockData2]    
    const actual = await sut.findAllBy('mockKey1', 'blah')

    expect(actual).toEqual(expected);
  })

  it('update method should update the data present in the database', async () => {
    const mockId1 = await sut.insert(mockData1)

    await sut.update(mockId1, 'mockKey1', 'zz',)
    const actual = await sut.getBy('id', '1234')
    const expected = { ...mockData1, 'mockKey1': 'zz'  }    
    
    expect(actual).toEqual(expected)
  })

  it('delete method should delete the object from the database', async () => {
    const mockId1 = await sut.insert(mockData1)
    await sut.delete(mockId1)

    const actual = await sut.getBy('id', '1919')
    expect(actual).toBeUndefined()
  })

  it('getAllElements should return all items from the database', async () => {
    await sut.insert(mockData1)
    await sut.insert(mockData2)

    const actual = await sut.getAllElements()
    const expected = [mockData1, mockData2]

    expect(actual).toEqual(expected);
  })
})
