import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { DataBase } from "../../../app/server_app/data/DataBase";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";

const insertMock = jest.fn()
const updateMock = jest.fn()
const deleteMock = jest.fn()
const getByMock = jest.fn()
const getAllElementsMock = jest.fn()

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
      DataBase: jest.fn().mockImplementation(() => {
        return {
          insert: insertMock,
          update: updateMock,
          delete: deleteMock,
          getBy: getByMock,
          getAllElements: getAllElementsMock,
        }
      })
    }
})

const mockReservationId = '111'
const mockRandomId = '999'

const mockReservation1: Reservation = {
  id: '000',
  room: 'A2',
  user: 'VSVR',
  startDate: '1212',
  endDate: '1231'
}

const mockReservation2: Reservation = {
  id: '111',
  room: 'B2',
  user: 'VSVR',
  startDate: '1212',
  endDate: '1231'
}

describe('ReservationDataAccess test suite', () => {
  let sut: ReservationsDataAccess

  beforeEach(() => {
    sut = new ReservationsDataAccess()
    expect(DataBase).toHaveBeenCalledTimes(1)
  })
  
  afterEach(() => jest.clearAllMocks())

  it('createReservation should create a reservation and return an id', async () => {
    insertMock.mockResolvedValueOnce(mockReservationId)

    const actual = await sut.createReservation(mockReservation1)
    expect(actual).toBe(mockReservationId)
    expect(insertMock).toHaveBeenCalledWith(mockReservation1)
  })

  it('updateReservation should update a reservation', async () => {
    insertMock.mockResolvedValueOnce(mockReservationId)
    updateMock.mockResolvedValueOnce({
      id: '000',
      room: 'serena',
      user: 'VSVR',
      startDate: '1212',
      endDate: '1231'
    })
    getByMock.mockResolvedValueOnce({
      id: '000',
      room: 'serena',
      user: 'VSVR',
      startDate: '1212',
      endDate: '1231'
    })

    const reservationId = await sut.createReservation(mockReservation1)

    await sut.updateReservation(reservationId, 'room', 'serena')
    const actual = await sut.getReservation(reservationId)
    const expected = { ...mockReservation1, 'room': 'serena' }

    expect(actual).toEqual(expected)
  })

  it('deleteReservation should delete a reservation', async () => {
    await sut.deleteReservation(mockReservationId)
    expect(deleteMock).toHaveBeenCalledWith(mockReservationId)
  })

  it('getReservation should return a reservation', async () => {
    getByMock.mockResolvedValueOnce(mockReservation1)
    
    const actual = await sut.getReservation(mockReservation1.id)
    expect(actual).toBe(mockReservation1)
    expect(getByMock).toHaveBeenCalledWith('id', mockReservation1.id)
  })

  it('getAllReservations should return a list of all the reservations', async () => {
    getAllElementsMock.mockResolvedValueOnce([mockReservation1, mockReservation2])
    
    const actual = await sut.getAllReservations()
    expect(actual).toEqual([mockReservation1, mockReservation2])
    expect(getAllElementsMock).toHaveBeenCalled()
    expect(getAllElementsMock).toHaveBeenCalledTimes(1)
  })
})