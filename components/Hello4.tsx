import { createContext, useContext, ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetHello4Data {
    yourData {
      name
    }
  }
`;

const Hello4Context = createContext<{
  loading: boolean;
  error?: Error;
  name?: string;
}>({
  loading: true
});

export function Hello4Provider({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  return (
    <Hello4Context.Provider value={{
      loading,
      error,
      name: data?.yourData?.name
    }}>
      {children}
    </Hello4Context.Provider>
  );
}

interface Hello4Props {
  name?: string;
}

const Hello4: React.FC<Hello4Props> = ({ name: defaultName = "World" }) => {
  const { loading, error, name: contextName } = useContext(Hello4Context);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = contextName || defaultName;
  return <h1>Hello4, {name}!</h1>;
};

export default Hello4;
