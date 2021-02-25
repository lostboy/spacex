export const getCacheTypePolicies = () => {
  return {
    typePolicies: {
      Query: {
        fields: {
          launchesPast: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          }
        }
      }
    },
  };
};
