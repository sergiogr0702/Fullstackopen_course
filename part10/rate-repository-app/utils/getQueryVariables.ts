import { Filter, orderDirection, orderBy } from "@/types";

export const getQueryVariables = (filter: Filter) => {
  switch (filter) {
    case Filter.LATEST:
      return {
        orderBy: orderBy.CREATED_AT,
        orderDirection: orderDirection.DESC,
      };
    case Filter.HRATED:
      return {
        orderBy: orderBy.RATING_AVERAGE,
        orderDirection: orderDirection.DESC,
      };
    case Filter.LRATED:
      return {
        orderBy: orderBy.RATING_AVERAGE,
        orderDirection: orderDirection.ASC,
      };
    default:
      return {
        orderBy: orderBy.CREATED_AT,
        orderDirection: orderDirection.DESC,
      };
  }
};
