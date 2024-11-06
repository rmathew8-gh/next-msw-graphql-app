import { graphql, HttpResponse } from "msw";
import Hello3, { Hello3Provider } from "./Hello3";
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
        <Hello3Provider>
          <Story />
        </Hello3Provider>
      </ApolloProvider>
    ),
  ],
};

const Template = (args: Hello3Props) => <Hello3 {...args} />;

export const SuccessState = {
  render: Template,
  args: {
    name: "Default Name"
  },
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
