import { assign, setup } from 'xstate';

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
  actions: {
    setAsleepPhrase: assign({
      catchPhrase: "Shhh! Kitty is asleep",
    }),
    setAwakePhrase: assign({
      catchPhrase: "Kitty is awake! Let's play with him!",
    }),
    setZoomiesPhrase: assign({
      catchPhrase: "Kitty is zooming around! The beast is unleashed!",
    }),
    setEatingPhrase: assign({
      catchPhrase: "Dinner is served! Tuna is the best!",
    }),
  },
}).createMachine({
  id: "cat",
  initial: "ASLEEP",
  context: {
    catchPhrase: "Shhh! Kitty is asleep",
  },
  states: {
    "ASLEEP": {
      on: {
        "WAKE": {
          target: "AWAKE",
          actions: "setAwakePhrase",
        },
      },
    },
    "AWAKE": {
      initial: "WAITING",
      on: {
        "SLEEP": {
          target: "ASLEEP",
          actions: "setAsleepPhrase",
        },
      },
      states: {
        "WAITING": {
          on: {
            "ZOOMIES": {
              target: "ZOOMIES",
              actions: "setZoomiesPhrase",
            },
            "EATING": {
              target: "EATING",
              actions: "setEatingPhrase",
            },
          },
        },
        "ZOOMIES": {
          on: {
            "STOP_ZOOMIES": {
              target: "WAITING",
              actions: "setAwakePhrase",
            },
          },
        },
        "EATING": {
          on: {
            "STOP_EATING": {
              target: "WAITING",
              actions: "setAwakePhrase",
            },
          },
        },
      },
    },
  },
});