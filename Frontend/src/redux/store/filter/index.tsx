import apiService from 'services/api-services';
import URL_PATHS from 'services/url-path';

export const GetOptionsRole = async (search: string, page: number, pageSize: number) => {
  try {
    const data = {
      pageIndex: page,
      pageSize: pageSize
    };
    const res: any = await apiService.getFilter(URL_PATHS.GET_LIST_ROLE, data);
    const { roles } = res;
    const ListRole = roles.items.map((x: any) => {
      return { label: x.name, value: x.id };
    });
    return {
      options: ListRole,
      hasMore: Math.ceil(res.totalCount / pageSize) > page
    };
    return res;
  } catch (error) {
    throw error;
  }
};
