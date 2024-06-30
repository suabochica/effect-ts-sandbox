🛰️ Batching
===========

Batching is the act of grouping tasks together, so you do them all at once, instead of switching between tasks that take place in different programs or areas.

Batching API calls can drastically improve the performance of your application by reducing the number of HTTP requests.

Let's assume that `getUserById` and `sendEmail` can be batched. This means that we can send multiple requests in a single HTTP call, reducing the number of API requests and improving performance.

🐾 Step-by-Step Guide to Batching
---------------------------------

1. **Structuring Requests:** We'll start by transforming our requests into structured data models. This involves detailing input parameters, expected outputs, and possible errors. Structuring requests this way not only helps in efficiently managing data but also in comparing different requests to understand if they refer to the same input parameters.
2. **Defining Resolvers:** Resolvers are designed to handle multiple requests simultaneously. By leveraging the ability to compare requests (ensuring they refer to the same input parameters), resolvers can execute several requests in one go, maximizing the utility of batching.
3. **Creating Queries:** Finally, we'll define queries that utilize these batch-resolvers to perform operations. This step ties together the structured requests and their corresponding resolvers into functional components of the application.

👀 Important Considerations
---------------------------

It's crucial for the requests to be modeled in a way that allows them to be comparable. This means implementing comparability (using methods like Equals.equals) to identify and batch identical requests effectively.

🕹 Resolvers with Context
-------------------------

In complex applications, resolvers often need access to shared services or configurations to handle requests effectively. However, maintaining the ability to batch request while providing the necessary context can be challenging. Here, we will explore how to manage context in resolvers to ensure that batching capabilities are not compromised.

When creating request resolvers, it is crucial to manage the context carefully. Providing too much context or providing varying services to resolvers can make them incompatible for batching. To prevent such issues, the context for the resolver used in `Effect.request` is explicitly set to `never`. This force developers to clearly define how the context is accessed and used within resolvers.

> Resolvers can also access the context like any other Effect, and there are many different ways to create resolvers. For further details, consider exploring the reference documentation for the RequestResolver module. 