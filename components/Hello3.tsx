import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetHello3Data {
    yourData {
      name
    }
  }
`;

interface Hello3Props {
  name?: string;
}

const Hello3: React.FC<Hello3Props> = ({ name: defaultName = "World" }) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = data?.yourData?.name || defaultName;
  return <h1>Hello3, {name}!</h1>;
};

export default Hello3;
