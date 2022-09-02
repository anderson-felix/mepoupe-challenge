import logMock from '@modules/log/__tests__/mocks/logMock';
import { formatPagingResponse } from '@shared/utils';

describe('Unit - formatPagingResponse', () => {
  it('Should paginate response based on paging config', () => {
    {
      const paging = { where: {} };

      const expected = {
        limit: 0,
        page: 1,
        pages: 1,
        results: [],
        results_length: 0,
        total: 0,
      };

      const value = formatPagingResponse(paging, [[], 0]);
      expect(value).toStrictEqual(expected);
    }
    {
      const quantity = 15;
      const paging: any = { where: {} };

      const projects = Array.from({ length: quantity }, () => logMock());
      const paginateProjects =
        paging.skip > 1
          ? projects.slice(paging.take * (paging.skip - 1))
          : projects;

      const expected = {
        limit: quantity,
        page: 1,
        pages: 1,
        results: paginateProjects,
        results_length: quantity,
        total: quantity,
      };

      const value = formatPagingResponse(paging, [paginateProjects, quantity]);
      expect(value).toStrictEqual(expected);
    }
    {
      const quantity = 15;
      const paging = { where: {}, skip: 2, take: 20 };

      const projects = Array.from({ length: quantity }, () => logMock());
      const paginateProjects =
        paging.skip > 1
          ? projects.slice(paging.take * (paging.skip - 1))
          : projects;

      const expected = {
        limit: paging.take,
        page: 2,
        pages: 1,
        results: paginateProjects,
        results_length: 0,
        total: quantity,
      };

      const value = formatPagingResponse(paging, [paginateProjects, quantity]);
      expect(value).toStrictEqual(expected);
    }
    {
      const quantity = 30;
      const paging = { where: {}, skip: 2, take: 20 };
      const projects = Array.from({ length: quantity }, () => logMock());
      const paginateProjects =
        paging.skip > 1
          ? projects.slice(paging.take * (paging.skip - 1))
          : projects;

      const expected = {
        limit: paging.take,
        page: 2,
        pages: 2,
        results: paginateProjects,
        results_length: 10,
        total: quantity,
      };

      const value = formatPagingResponse(paging, [paginateProjects, quantity]);
      expect(value).toStrictEqual(expected);
    }
  });
});
