import { gql, useQuery } from '@apollo/client';

const GET_HELLO_DATA = gql`
  query GetHello2Data {
    yourData {
      name
    }
  }
`;

interface Hello2Props {
  name?: string;
}

const Hello2: React.FC<Hello2Props> = ({ name: defaultName = "World" }) => {
  const { loading, error, data } = useQuery(GET_HELLO_DATA);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const name = data?.yourData?.name || defaultName;
  return <h1>Hello2, {name}!</h1>;
};

export default Hello2;
