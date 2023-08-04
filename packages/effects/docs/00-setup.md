Requisites
==========

- yarn: package manager
- node: version 18.0.0
- nvm: node version manager

Setup
-----

Open the project and install the node version 18.0.0 using `nvm` running:

```sh
nvm use
```

This command will read the contents of the `.nvmrc` file to install the node version specified there.

Next, install the `yarn` package manager globally:

```sh
npm i -g yarn
```

To check that yarn was successfully installed verify the version:

```sh
yarn --version
```

The output should be something like:

```sh
1.22.19
```

Install the project dependencies via:

```sh
yarn install
```

Now you are able to run the scripts defined in the project.
