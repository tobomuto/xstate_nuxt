<script setup>
import { useMachine } from '@xstate/vue';
const { snapshot, send } = useMachine(catMachine);
</script>

<template>
  <main>
    <div class="w-full max-w-4xl mx-auto p-8 sm:px-6 lg:px-8 grid grid-cols-1 gap-4">
      <h1 class="text-center font-bold text-3xl">Gatto-san stato mācchine</h1>
      <div class="grid p-4 gap-4">
        <q class="text-center">{{ snapshot.context.catchPhrase }}</q>
        <div class="items-center w-full justify-self-center">
          <img v-if="snapshot.value === 'ASLEEP'" src="/img/cat-asleep.png" alt="">
          <img v-else-if="snapshot.matches('AWAKE.WAITING')" src="/img/cat-awake.png" alt="">
          <img v-else-if="snapshot.matches('AWAKE.ZOOMIES')" src="/img/cat-zoomies.png" alt="">
          <img v-else-if="snapshot.matches('AWAKE.EATING')" src="/img/cat-eating.png" alt="">
        </div>
        <div class="flex justify-end gap-4 flex-wrap">
          <button v-if="snapshot.matches('AWAKE.WAITING')" @click="send({ type: 'ZOOMIES' })">
            Start zoomies
          </button>
          <button v-if="snapshot.matches('AWAKE.ZOOMIES')" @click="send({ type: 'STOP_ZOOMIES' })">
            Stop zoomies
          </button>
          <button v-if="snapshot.matches('AWAKE.WAITING')" @click="send({ type: 'EATING' })">
            <Icon name="material-symbols:set-meal" /> Kittykitty! Meal is ready
          </button>
          <button v-if="snapshot.matches('AWAKE.EATING')" @click="send({ type: 'STOP_EATING' })">
            <Icon name="tabler:fish-bone-filled" /> Finish meal
          </button>
          <button v-if="snapshot.value === 'ASLEEP'" @click="send({ type: 'WAKE' })">
            <Icon name="fluent:animal-cat-24-regular" /> Wake up kitty!
          </button>
          <button v-if="snapshot.matches('AWAKE')" @click="send({ type: 'SLEEP' })">
            <Icon name="fluent:animal-cat-24-regular" /> What a day! Time to sleep
          </button>
        </div>
        <div class="mt-4 p-4 border rounded">
          <h3 class="font-semibold mb-2">Current State Info:</h3>
          <div class="space-y-1 text-sm">
            <div><strong>State Value:</strong> {{ snapshot.value }}</div>
            <div><strong>Context:</strong> {{ snapshot.context }}</div>
            <div><strong>All Active States:</strong> {{ snapshot.status }}</div>
            <div><strong>Is Asleep:</strong> {{ snapshot.matches('ASLEEP') }}</div>
            <div><strong>Is Awake & Waiting:</strong> {{ snapshot.matches('AWAKE.WAITING') }}</div>
            <div><strong>Is in Zoomies:</strong> {{ snapshot.matches('AWAKE.ZOOMIES') }}</div>
            <div><strong>Is Eating:</strong> {{ snapshot.matches('AWAKE.EATING') }}</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
