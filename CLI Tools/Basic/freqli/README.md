# For GSSoC:
You can refer to this [Notion doc](https://shobhitnagpal.notion.site/Freqli-see-your-command-frequencies-e1580ad9d16b42dd8103724bdadd7944) to learn how to go about making this tool :))

Feel free to reach out to me in case of any doubts

# freqli

freqli is a command-line tool that analyzes command frequency in your shell history files. It helps you identify the most commonly used commands and optimize your workflow.

## Features

- Analyze command frequency in Bash and Zsh history files.
- Supports both Bash and Zsh shells.
- Easy to install and use.

## Installation

### Install with Go

```sh
go install github.com/Shobhit-Nagpal/freqli/cmd/freqli@latest
```

### Install with Homebrew

#### Tap the repo

```sh
brew tap Shobhit-Nagpal/freqli
```

#### Install freqli

```sh
brew install freqli
```

## Usage

After installing freqli, you can use it to analyze your shell history files. Here's how you can use it:

```sh
freqli --shell <shell_type>
```

Replace `<shell_type>` with either `bash` or `zsh`, depending on the type of shell you're using.

For example, to analyze your Bash history:

```sh
freqli --shell bash
```

And to analyze your Zsh history:

```sh
freqli --shell zsh
```

## Contributing

Contributions are welcome! If you have any ideas for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## Acknowledgments

Credits to [Boot.dev](https://boot.dev) for introducing the history command in their course.
