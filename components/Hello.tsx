import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetHelloData {
    yourData {
      name
    }
  }
`;

interface HelloProps {
  name?: string;
}

const Hello: React.FC<HelloProps> = ({ name: defaultName = "World" }) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = data?.yourData?.name || defaultName;
  return <h1>Hello, {name}!</h1>;
};

export default Hello;
