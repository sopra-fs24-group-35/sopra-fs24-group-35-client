# SoPra Risk Game FS24
With this project we wanted to make it possible for people to play the board game Risk with each other even if they can't meet in person. We all like strategy games but luck also having a deciding factor makes the game more random and fun which is why we chose to implement risk. In the end we want to have a functioning version of risk which is simple to play and can be extended on. We also want the ui to be simple but understandable.

## Technologies:
-  Node.js
-  [react](https://react.dev/)

## High-level Component:
-  todo
-  todo

## Getting started

Read and go through these Tutorials. It will make your life easier:)

- Read the React [Docs](https://react.dev/learn)
- Do this React [Getting Started](https://react.dev/learn/tutorial-tic-tac-toe) Tutorial (it doesn't assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reactrouter.com/en/main/start/concepts) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://blog.logrocket.com/using-hooks-react-router/) let you access the router's state and perform navigation from inside your components.

## Prerequisites and Installation
For your local development environment, you will need Node.js.\
We urge you to install the exact version **v20.11.0** which comes with the npm package manager. You can download it [here](https://nodejs.org/download/release/v20.11.0/).\
If you are confused about which download to choose, feel free to use these direct links:

- **MacOS:** [node-v20.11.0.pkg](https://nodejs.org/download/release/v20.11.0/node-v20.11.0.pkg)
- **Windows 32-bit:** [node-v20.11.0-x86.msi](https://nodejs.org/download/release/v20.11.0/node-v20.11.0-x86.msi)
- **Windows 64-bit:** [node-v20.11.0-x64.msi](https://nodejs.org/download/release/v20.11.0/node-v20.11.0-x64.msi)
- **Linux:** [node-v20.11.0.tar.xz](https://nodejs.org/dist/v20.11.0/node-v20.11.0.tar.xz) (use this [installation guide](https://medium.com/@tgmarinho/how-to-install-node-js-via-binary-archive-on-linux-ab9bbe1dd0c2) if you are new to Linux)

If you happen to have a package manager the following commands can be used:

- **Homebrew:** `brew install node@20.11.0`
- **Chocolatey:** `choco install nodejs-lts --version=20.11.0`

After the installation, update the npm package manager to **10.4.0** by running ```npm install -g npm@10.4.0```\
You can ensure the correct version of node and npm by running ```node -v``` and ```npm --version```, which should give you **v20.11.0** and **10.4.0** respectively.\
Before you start your application for the first time, run this command to install all other dependencies, including React:

```npm install```

Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use a Chrome-based browser).\
The client will send HTTP requests to the server which can be found [here](https://github.com/HASEL-UZH/sopra-fs24-template-server).\
In order for these requests to work, you need to install and start the server as well.

### Testing
Testing is optional, and you can run the tests with `npm run test`\
This launches the test runner in an interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance:\
The build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

To learn React, check out the [React documentation](https://react.dev/).

## Illustrations:
todo

## Contributing:
Please read [CONTRIBUTING.md] for details on our code of conduct, and the process for submitting pull requests to us.

## Roadmap:
-  You could add an edit page where the user could change his username and avatar. There are already some things implemented for it.
-  You could create dices which are displayed after every attack in the bottom middle of the screen. The server already returns the dice rolls after every attack.
-  You could create more maps to play one. There are multiple examples on the risk website.

## Authors and Acknowledgement:
-  SylverSezari - Founder
-  roburkUZH - Founder
-  Cross55 - Founder
-  Eposs111 - Founder
-  RPKosch - Founder

Thanks to Lucas Pelloni Kyrill Hux and Marco Leder for working on the template.

## License:
This project is licensed under the GNU License - see the [LICENSE.md] file for details

[CONTRIBUTING.md]: https://github.com/sopra-fs24-group-35/sopra-fs24-group-35-client/blob/main/CONTRIBUTING.md
[LICENSE.md]: https://github.com/sopra-fs24-group-35/sopra-fs24-group-35-client/blob/main/LICENSE
