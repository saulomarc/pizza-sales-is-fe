<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { UserCircleIcon } from '@heroicons/vue/20/solid'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<template>
    <header class="">
        <Disclosure as="nav" class="bg-white shadow-sm" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex">
                        <div class="mr-2 -ml-2 flex items-center md:hidden">
                            <!-- Mobile menu button -->
                            <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset">
                                <span class="absolute -inset-0.5" />
                                <span class="sr-only">Open main menu</span>
                                <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                                <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                            </DisclosureButton>
                        </div>
                        <div class="flex shrink-0 items-center">
                            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                        </div>
                        <div class="hidden md:ml-6 md:flex md:space-x-8">
                            <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                            <router-link to="/" class="inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 hover:border-b-2" activeClass="border-indigo-500 text-gray-900 border-b-2">Dashboard</router-link>
                            <!-- <router-link to="/about" class="inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700 hover:border-b-2" activeClass="border-indigo-500 text-gray-900 border-b-2">About</router-link> -->
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="shrink-0">

                        </div>
                        <div class="hidden md:ml-4 md:flex md:shrink-0 md:items-center">
                            
                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton class="relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                                        <span class="absolute -inset-1.5" />
                                        <span class="sr-only">Open user menu</span>
                                        <UserCircleIcon class="size-8" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                                        <MenuItem v-slot="{ active }">
                                            <a href="#" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</a>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <a href="#" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</a>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <a href="#" @click="authStore.logout()" :class="[active ? 'bg-gray-100 outline-hidden' : '', 'block px-4 py-2 text-sm text-gray-700']">Sign out</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
            
            <DisclosurePanel class="md:hidden">
                <div class="space-y-1 pt-2 pb-3">
                    <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
                    <DisclosureButton as="a" href="/" class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700 sm:pr-6 sm:pl-5">Dashboard</DisclosureButton>
                    <!-- <DisclosureButton as="a" href="/about" class="block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pr-6 sm:pl-5">About</DisclosureButton> -->
                </div>
                <div class="border-t border-gray-200 pt-4 pb-3">
                    <div class="flex items-center px-4 sm:px-6">
                        <div class="shrink-0">
                            <UserCircleIcon class="size-10" />
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium text-gray-800">Tom Cook</div>
                            <div class="text-sm font-medium text-gray-500">tom@example.com</div>
                        </div>
                        <button type="button" class="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="size-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div class="mt-3 space-y-1">
                        <DisclosureButton as="a" href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Your Profile</DisclosureButton>
                        <DisclosureButton as="a" href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Settings</DisclosureButton>
                        <DisclosureButton as="a" href="#" @click="authStore.logout()" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Sign out</DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </header>
    
    <div class="px-16">
        <RouterView />
    </div>
</template>