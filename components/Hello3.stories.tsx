import { graphql, HttpResponse } from "msw";
import Hello3 from "./Hello3";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Hello3",
  component: Hello3,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Hello3 {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetHello3Data", () => {
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
