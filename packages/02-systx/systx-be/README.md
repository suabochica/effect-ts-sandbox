🗃️ systx-be
========

A simple RESTful API build on [deno](https://deno.com).

```sh
deno run
```

🚀 Run the server
-----------------

To run the server check the steps in the getting started session to validate that velociraptor was installed.

To check the available script in your project, just run:

```sh
vr
```

The output list the script in the project, for this case you get:

```txt
  🦖 Available scripts

    • start
    Run the server
    $ deno run --allow-net --allow-read --allow-write --allow-env src/main.ts

  To run a script pass its name as the first argument to the vr command:

  $ vr start

  Any additional arguments will be passed to the script.
```

Let's run the script:

```sh
vr start
```

The output should be:

```txt
Listening on port 4000...
```

🏗️ Getting Started
------------------

> ⚠️ These instructions were running on WSL and macOS

Install deno via:

```sh
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Include deno in your path environment. So edit your `.bashrc` file via vim:

```sh
vi ~/.bashrc
```

Adds the next contents in the end of the file:

```sh
## Deno
## -------------

export DENO_DIR="$HOME/.deno"
export PATH="$DENO_DIR/.bin:$PATH"
```

Then, restart your bash run command file:

```sh
source ~/.bashrc
```

To test your deno installation run:

```sh
deno --version
```

The output should be:

```txt
deno 1.34.3 (release, x86_64-unknown-linux-gnu)
v8 11.5.150.2
typescript 5.0.4
```

This validate that deno was properly installed.

Velociraptor (shortened `vr`) is the script runner for deno. To install it from [deno.land](https://deno.land/x/velociraptor@1.5.0), run:

```sh
deno install -qAn vr https://deno.land/x/velociraptor@1.5.0/cli.ts
```

To test your velociraptor installation run:

```sh
vr --version
```

The output should be:

```txt
1.5.0
```

This validate that vr was properly installed.

📁 Folder Structure
----------------------

⚠️ TODO: Explain folders

Below is a high level description of the folders relationship.

```txt
main.ts <-- /routes
main.ts <-- /services

/router <-- /model
/router <-- /services
/router <-- /support

/service <-- /model
/service <-- /adapters
/service <-- /support/lens

/model <-- /support/scheme
```

🧰 Toolkit
----------

- [deno](https://deno.com)
- [velociraptor](https://velociraptor.run)
