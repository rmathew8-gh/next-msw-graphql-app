import { createContext, useContext, ReactNode } from 'react';
import { gql, useQuery } from '@apollo/client';

const Hello3Context = createContext<{
  loading: boolean;
  error?: Error;
  name?: string;
}>({
  loading: true
});

const GET_HELLO_DATA = gql`
  query GetHello3Data {
    yourData {
      name
    }
  }
`;

export function Hello3Provider({ children }: { children: ReactNode }) {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  return (
    <Hello3Context.Provider value={{
      loading,
      error,
      name: data?.yourData?.name
    }}>
      {children}
    </Hello3Context.Provider>
  );
}

interface Hello3Props {
  name?: string;
}

function useHello3Context() {
  const context = useContext(Hello3Context);
  if (!context) {
    throw new Error('useHello3Context must be used within a Hello3Provider');
  }
  return context;
}

const Hello3: React.FC<Hello3Props> = ({ name: defaultName = "World" }) => {
  const { loading, error, name: contextName } = useHello3Context();

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = contextName || defaultName;
  return <h1>Hello3, {name}!</h1>;
};

export default Hello3;
