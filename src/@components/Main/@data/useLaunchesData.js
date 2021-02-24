import React from "react";

// Apollo
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/client";

/**
 * Queries
 */

const LAUNCHES = gql`
  query($limit: Int!, $offset: Int!, $search: String) {
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

const limit = 5;

const useLaunchesData = (main_ref) => {
  // Hooks
  const [launches_data, setLaunchesData] = React.useState([]);
  const offset = React.useRef(0);

  const [getLaunches, { loading, error }] = useLazyQuery(LAUNCHES, {
    onCompleted: ({ launchesPast }) => {
      offset.current += limit;

      setLaunchesData([...launches_data, ...launchesPast]);

      loadLaunches();
    },
    onError: (error) => console.error(error),
  });

  const loadLaunches = React.useCallback(() => {
    if (main_ref.current) {
      if (main_ref.current.scrollHeight - main_ref.current.scrollTop === window.innerHeight) {
        if (!loading) {
          getLaunches({
            variables: {
              limit,
              offset: offset.current,
            },
          });
        }
      }
    }
  }, [getLaunches, loading, main_ref]);

  return [
    loadLaunches,
    {
      data: launches_data,
      error,
      loading,
    },
  ];
};

export default useLaunchesData;
