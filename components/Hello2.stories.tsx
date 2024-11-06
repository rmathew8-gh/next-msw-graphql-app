import { graphql, HttpResponse } from "msw";
import Hello2 from "./Hello2";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Hello2",
  component: Hello2,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Story />
      </ApolloProvider>
    ),
  ],
};

const Template = (args: { id: number; name: string }) => <Hello2 {...args} />;

export const SuccessState = {
  render: Template,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetHello2Data", () => {
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
