import { useCallback, useMemo } from "react";

// Apollo
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

/**
 * Queries
 */

const LAUNCHES = gql`
  query($limit: Int! = 5, $offset: Int! = 0, $search: String) {
    launchesPast(limit: $limit, offset: $offset, find: { mission_name: $search }) {
      id
      mission_name
      launch_date_local
      rocket {
        rocket_name
      }
    }
  }
`;

const useLaunchesData = () => {
  const { data, fetchMore, ...query } = useQuery(LAUNCHES);
  
  const launches = useMemo(() => {
    return data ? data.launchesPast : []
  }, [data]);

  const loadMore = useCallback(() => fetchMore({
    variables: {
      offset: launches.length,
    },
  }), [launches, fetchMore]);

  return useMemo(() => {
    return [
      launches,
      {
        loadMore,
        ...query,
      },
    ];
  }, [launches, loadMore]);
};

export default useLaunchesData;
