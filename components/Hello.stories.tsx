import { graphql, HttpResponse } from "msw";
import Hello from "./Hello";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Hello",
  component: Hello,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Hello {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetHelloData", () => {
          return HttpResponse.json({
            data: {
              yourData: { name: "Mocked Data" },
            },
          });
        }),
      ],
    },
  },
};
