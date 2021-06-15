# Civic Data Identity Partnership

This repository will contain a development environment and an
implementation of some initial ideas around a DLT-based system for
co-ordinating consent for health data reuse.

## Development

### Running Dev Environment

Use the command
```bash
> ./cmd/launch dev
```
to run the compile and migrate contracts to a test network. In lieu of a sensible *nix environment, run the command through python
```bash
> python3 /cmd/launch
```
the following flags are available:

- -c - launch the truffle development console
- -s - launch a shell environment
- -b - rebuild the docker images
- -h - help output

### Contributing

We encourage a [triangle workflow](https://gist.github.com/anjohnson/8994c95ab2a06f7d2339) for development, with pull requests going directly onto the master branch; essentially a [github flow](https://guides.github.com/introduction/flow/) model.

### Requirements

We will make the dev environment Docker-based for consistency / ease-of-use, so requirements for use should be limited to:

- Docker (make sure it's a latest or very recent release)
- Python 3 (for scripting
)
