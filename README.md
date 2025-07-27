# Node.js intro

## HW #5 backend

### Streaming random numbers using pipeline
RandomNumberStream takes parameters and streams random numbers to listeners.

UniqueNumbers checks that streamed numbers are unique.

CounterStream counts the number of streamed numbers and stops the pipeline when the limit is reached.

Parameters can be defined in a config.

The default values are:
    "count": "7",
    "min": "1",
    "max": "49"

There is a limitation on the count parameter, since we use a set to check for uniqueness.
