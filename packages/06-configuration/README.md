⚙️ Configuration
===============

Configuration is an essential aspect of any cloud-native application. Effect simplifies the process of managing configuration by offering a convenient interface for configuration providers.

The configuration front-end in Effect enable ecosystem libraries and applications to specify their configuration requirements in a declarative manner. It offloads the complex tasks to a `ConfigProvider` which can be supplied by third-party libraries.

Effect comes bundled with a straightforward default ConfigProvider that retrieves configuration data from environment variables. This default provider can be used during development or as a starting point before transitioning to more advanced configuration providers.

🧪 Example
----------

Let's start with a simple example of how to read configuration from environment variables:

```sh
pnpm run index
```

The output its:

```txt
Server is running on localhost:8080
```

🧞 Commands
-----------

All these commands are executed from the root of the packages. i.e., `effect-ts-sandbox/packages/06-configuration`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run index`           | Starts a set up with a host and a port           |
