# Easygenerator Technical Task

## Video Demo

https://github.com/user-attachments/assets/d1257f9f-7769-4dbd-8268-f91988f54d07

## Stack

### Shared

- Package manager: `pnpm`, I prefer immensly to npm or yarn
- Build Tool: Vite.

### Backend

- Nestjs

### Frontend

- React

## What's Missing? 
- Pretty much no automated/unit testing. Between diving deep into Nest, Mongoose, Tanstack Router+Forms, etc... I Didn't have time for them.
- No API Docs, unless you count my [Yaak](https://yaak.app/) collection, which you can find in the directory `./easygen-backend/api-docs/`

  ![image](https://github.com/user-attachments/assets/98ebd722-a60e-493e-8e8e-754f54ee0bf2)

  Why Yaak? Well, Postman, Insomnia, Thunderclient, etc... are all bloated. Yaak feels nice to use and doesn't require accounts.
  I can also sync my collection with git, since it's all Yaml files.

- CSRF Tokens: Would be nice to have, especially if there are more complicated forms. I'm used to getting them for free in Ruby on Rails
  so I didn't bother to figure out how to manually implement them till now.

- Fine-Grained CORS policies: For now everything is just whitelisted. Ideally I would whitelist just a few specific domains.

- HTTPS: Would need to figure out setting up a certificate with node apps. Didn't have time for that.
