# Description

A basic app that shows how to use msw with graphql in a React app.

## Steps

``` {.bash org-language="sh"}
npx create-next-app next-msw-graphql-app

cd next-msw-graphql-app
pnpm i -D msw msw-storybook-addon @storybook/react
pnpm i graphql @apollo/client

npx storybook@latest init
npx msw init ./public
```

## Usage Patterns

### Pattern 1: Component-level Query

-   see Hello.tsx, Hello.stories.tsx
-   The data is only needed by this component
-   The query is simple
-   You don't need to share the data with other components

### Pattern 2: Custom Hook

-   see Hello2.tsx, Hello2.stories.tsx
-   Reuse the query logic across multiple components
-   Separate data fetching concerns
-   Add additional data transformation logic

```mermaid
graph TD
    A[Hello2.stories.tsx] -->|Provides Mock Data| B[MSW Handler]
    A -->|Wraps with| C[ApolloProvider]
    C -->|Provides client to| D[Hello2 Component]
    D -->|Uses| E[useHello2Data Hook]
    E -->|Executes| F[GetHello2Data Query]
    B -->|Intercepts| F
    F -->|Returns| G[name data]
    G -->|Renders| H["Hello2, {name}!"]

    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#bfb,stroke:#333
    style D fill:#fbf,stroke:#333
```

```mermaid
classDiagram
    class Hello2Props {
        <<interface>>
        +name?: string
    }

    class Hello2Component {
        <<React.FC>>
        +render()
        -defaultName: string
    }

    class useHello2Data {
        <<hook>>
        +loading: boolean
        +error: ApolloError
        +name: string
        -GET_HELLO_DATA: gql
    }

    class GraphQLSchema {
        <<type>>
        +yourData: YourData
    }

    class YourData {
        <<type>>
        +name: string
    }

    class ApolloClient {
        <<service>>
        +useQuery()
        +cache: InMemoryCache
        +uri: string
    }

    Hello2Component ..|> Hello2Props : implements
    Hello2Component --> useHello2Data : uses
    useHello2Data --> ApolloClient : queries
    ApolloClient --> GraphQLSchema : fetches
    GraphQLSchema --> YourData : contains
```

### Pattern 3: Context Provider

-   see Hello3.tsx, Hello3.stories.tsx
-   The data needs to be shared across many components
-   You want to avoid prop drilling
-   You need to manage global state


```mermaid
graph TD
    subgraph "Hello3.stories.tsx"
        ST[Storybook Config] --> AP[ApolloProvider]
        AP --> H3P[Hello3Provider]
        H3P --> H3C[Hello3 Component]
        MSW[MSW Handlers] -.->|Mock GraphQL Response| AP
    end

    subgraph "Hello3.tsx"
        H3CTX[Hello3Context] --> H3PROV[Hello3Provider Component]
        GQL[GraphQL Query] --> H3PROV
        H3PROV --> HOOK[useHello3Context Hook]
        HOOK --> H3[Hello3 Component]
        
        H3 -->|Renders| OUTPUT[h1 Element]
        
        subgraph "Data Flow"
            H3PROV -->|Provides Context| CTX_VALUES[Context Values]
            CTX_VALUES -->|loading\nerror\nname| H3
        end
    end

    style H3CTX fill:#f9f,stroke:#333
    style GQL fill:#bbf,stroke:#333
    style MSW fill:#bfb,stroke:#333
```

```mermaid
classDiagram
    class Hello3Context {
        +loading: boolean
        +error?: Error
        +name?: string
    }

    class Hello3Provider {
        +children: ReactNode
        +useQuery(GET_HELLO_DATA)
        +render()
    }

    class Hello3 {
        +name?: string
        -defaultName: string
        +render()
    }

    class Hello3Props {
        <<interface>>
        +name?: string
    }

    class useHello3Context {
        +useContext(Hello3Context)
    }

    class GET_HELLO_DATA {
        +query: string
        +returns: Object
    }

    Hello3Provider --> Hello3Context : creates
    Hello3 ..|> Hello3Props : implements
    Hello3 --> useHello3Context : uses
    Hello3Provider --> GET_HELLO_DATA : queries
    useHello3Context --> Hello3Context : consumes
```
