import { graphql, HttpResponse } from "msw";
import Hello4, { Hello4Provider, Hello4Props } from "./Hello4";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default {
  title: "Roy/Hello4",
  component: Hello4,
  decorators: [
    (Story: React.ComponentType) => (
      <ApolloProvider client={client}>
        <Hello4Provider>
          <Story />
        </Hello4Provider>
      </ApolloProvider>
    ),
  ],
};

const Template = (args: Hello4Props) => <Hello4 {...args} />;

export const SuccessState = {
  render: Template,
  args: {
    name: "Default Name"
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetHello4Data", () => {
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
