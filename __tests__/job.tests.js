import request from 'supertest'
import app from '../app'

import * as t from '../cyberpunk';

import {mockMerc1} from "../mocks/merc.mocks";
import {jobMock1} from "../mocks/job.mocks";

jest.mock('../dal.js', () => {
    return jest.fn().mockImplementation(() => ({
        getAllJobsAsync: jest.fn(),
        getMercByIdAsync: jest.fn(),
        getWeaponByIdAsync: jest.fn(),
        getJobByIdAsync: jest.fn(),
        createJobAsync: jest.fn(),
        updateMercEddiesAsync: jest.fn(),
        updateJobToComplete: jest.fn()
    }))
})

beforeEach(() => {
    t.cyberpunk = jest.fn().mockReturnValue({
        getAllJobsAsync: jest.fn(),
        createJobAsync: jest.fn(),
        updateMercEddiesAsync: jest.fn(),
        updateJobToComplete: jest.fn()
    })
})

describe('Job actions :', () => {
    it('Get all jobs', async () => {
        const expectedResponseBody = [jobMock1];
        const getAllJobsAsync = jest.fn().mockReturnValue(expectedResponseBody);

        t.cyberpunk.mockReturnValue({ getAllJobsAsync });

        const res = await request(app).get('/jobs');
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expectedResponseBody)
        expect(getAllJobsAsync).toHaveBeenCalledTimes(1)
    })

    it('Create job', async () => {
        const query = {
            fixer: jobMock1.fixer,
            title: jobMock1.title,
            description: jobMock1.description,
            henchmenCount: jobMock1.henchmenCount,
            reward: jobMock1.reward
        };

        const expectedResponseBody = jobMock1;

        const createJobAsync = jest.fn().mockReturnValue(expectedResponseBody);
        t.cyberpunk.mockReturnValue({ createJobAsync });

        const res = await request(app).post('/jobs').send(query);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expectedResponseBody);
        expect(createJobAsync).toHaveBeenCalledTimes(1);
        expect(createJobAsync).toHaveBeenCalledWith(
            expectedResponseBody.fixer,
            expectedResponseBody.title,
            expectedResponseBody.description,
            expectedResponseBody.henchmenCount,
            expectedResponseBody.reward
        );
    })

    it('Complete job', async () => {
        const query = {
            idJob: jobMock1.id,
            idMerc: mockMerc1.id,
        };

        const updateMercEddiesAsync = jest.fn().mockReturnValue(jobMock1);
        const updateJobToComplete = jest.fn();
        t.cyberpunk.mockReturnValue({
            updateMercEddiesAsync,
            updateJobToComplete
        });

        const res = await request(app).post('/jobs/complete').send(query);
        expect(res.status).toBe(200);

        expect(updateMercEddiesAsync).toHaveBeenCalledTimes(1);
        expect(updateJobToComplete).toHaveBeenCalledTimes(1);
        expect(updateMercEddiesAsync).toHaveBeenCalledWith(
            jobMock1.id,
            mockMerc1.id,
        );
        expect(updateJobToComplete).toHaveBeenCalledWith(jobMock1);
    })
})
