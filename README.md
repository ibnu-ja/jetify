# jetify

## Introduction

This package is designed using [Vuetify](https://vuetifyjs.com) to use the power of material desings, in the starter kit for Laravel [Jetstream](https://jetstream.laravel.com) using [Inertia](https://jetstream.laravel.com/2.x/stacks/inertia.html) scaffolding and replace Laravel Mix with Vite using [Laravel Vite](https://github.com/innocenzi/laravel-vite) presets. Inspired by [Jet-Vuetify](https://github.com/AreWebs/Jet-Vuetify)

## Installation 

Use only with fresh Laravel 8/9 installation

First, use composer to install this package

```
composer require ibnu-ja/jetify
```

After installing, run artisan command:

```
php artisan jetify:install
```

or with teams
```
php artisan jetify:install --teams
```

## Finalizing Installation

Install Node dependencies and do database migration

```
npm install
# or with yarn
yarn install
php artisan migrate
```
Publish Laravel-Vite configuration
```
php artisan vendor:publish --tag=vite-config
```
Then, serve the application

```
npm run dev
# or with yarn
yarn dev
```
