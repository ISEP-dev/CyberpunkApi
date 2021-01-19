import request from 'supertest'
import app from '../app'

import * as t from '../cyberpunk';

import {weaponMock1} from "../mocks/weapon.mocks";
import {mockMerc1, mockMerc1WithWeapon} from "../mocks/merc.mocks";

jest.mock('../dal.js', () => {
    return jest.fn().mockImplementation(() => ({
        getAllMercsAsync: jest.fn(),
        getMercByIdAsync: jest.fn(),
        getWeaponByIdAsync: jest.fn(),
        getJobByIdAsync: jest.fn(),
        createMercAsync: jest.fn(),
        updateMercEddiesAsync: jest.fn(),
        updateMercWeaponAsync: jest.fn(),
    }))
})

beforeEach(() => {
    t.cyberpunk = jest.fn().mockReturnValue({
        getAllMercsAsync: jest.fn(),
        prepareWeaponForMercsAsync: jest.fn(),
        getWeaponByIdAsync: jest.fn(),
        getMercByIdAsync: jest.fn(),
        createJobAsync: jest.fn(),
        updateMercEddiesAsync: jest.fn(),
        updateJobToComplete: jest.fn()
    })
})

describe('Merc actions :', () => {
    it('Get all mercs', async () => {
        const expectedResponseBody = [mockMerc1];
        const expectedResponsePreparedMethodBody = [mockMerc1WithWeapon];
        const getAllMercsAsync = jest.fn().mockReturnValue(expectedResponseBody);
        const prepareWeaponForMercsAsync = jest.fn().mockReturnValue(expectedResponsePreparedMethodBody);

        t.cyberpunk.mockReturnValue({ getAllMercsAsync, prepareWeaponForMercsAsync });

        const res = await request(app).get('/mercs');
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expectedResponsePreparedMethodBody)
        expect(getAllMercsAsync).toHaveBeenCalledTimes(1)
        expect(prepareWeaponForMercsAsync).toHaveBeenCalledWith(expectedResponseBody)
        expect(prepareWeaponForMercsAsync).toHaveBeenCalledTimes(1)
    })

    it('Create mercs', async () => {
        const query = {
            nickname: mockMerc1.nickname,
            legalAge: mockMerc1.legalAge,
        };

        const expectedResponseBody = mockMerc1;

        const createMercAsync = jest.fn().mockReturnValue(expectedResponseBody);
        t.cyberpunk.mockReturnValue({ createMercAsync });

        const res = await request(app).post('/mercs').send(query);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expectedResponseBody);
        expect(createMercAsync).toHaveBeenCalledTimes(1);
        expect(createMercAsync).toHaveBeenCalledWith(
            expectedResponseBody.nickname,
            expectedResponseBody.legalAge,
        );
    })

    it('Update weapon of the merc', async () => {
        const query = {
            idWeapon: weaponMock1.id,
            idMerc: mockMerc1.id,
        };

        const updateMercWeaponAsync = jest.fn();
        t.cyberpunk.mockReturnValue({ updateMercWeaponAsync });

        const res = await request(app).put('/mercs/weapons').send(query);
        expect(res.status).toBe(200);

        expect(updateMercWeaponAsync).toHaveBeenCalledTimes(1);
        expect(updateMercWeaponAsync).toHaveBeenCalledWith(
            weaponMock1.id,
            mockMerc1.id,
        );
    })
})
