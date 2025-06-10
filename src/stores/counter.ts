import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAlertStore } from './alert'
import instance from '@/plugins/axios-plugin'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  
  async function fetchTestData() {
    try {
      const response = await instance.get('https://jsonplaceholder.typicode.com/todos/1');
      console.log(response)

      useAlertStore().success('KUng balikan man hirap luhat lahat')
    } catch (err : any) {
      console.log(err)
    } finally {
        
    }
  }
  return { count, doubleCount, increment, fetchTestData }
})
