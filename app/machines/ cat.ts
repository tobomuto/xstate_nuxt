import { setup } from 'xstate';

export const catMachine = setup({
  types: {
    context: {},
    events: {} as
      | { type: "WAKE" }
      | { type: "ZOOMIES" }
      | { type: "EATING" }
      | { type: "STOP_ZOOMIES" }
      | { type: "STOP_EATING" }
      | { type: "SLEEP" },
  },
}).createMachine({
  id: "cat",
  initial: "ASLEEP",
  states: {
    "ASLEEP": {
      on: {
        "WAKE": {
          target: "AWAKE",
        },
      },
    },
    "AWAKE": {
      initial: "WAITING",
      on: {
        "SLEEP": {
          target: "ASLEEP",
        },
      },
      states: {
        "WAITING": {
          on: {
            "ZOOMIES": {
              target: "ZOOMIES",
            },
            "EATING": {
              target: "EATING",
            },
          },
        },
        "ZOOMIES": {
          on: {
            "STOP_ZOOMIES": {
              target: "WAITING",
            },
          },
        },
        "EATING": {
          on: {
            "STOP_EATING": {
              target: "WAITING",
            },
          },
        },
      },
    },
  },
});