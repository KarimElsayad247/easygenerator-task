# Easygenerator Technical Task Frontend

## Notes

### Tools and Dependencies used

- [Tanstack Router](https://tanstack.com/router/latest) - A routing library and alternative to React-Router. 
  Puts a lot of emphasis on type safety.
- [Tanstack Forms](https://tanstack.com/form/latest) - type-safe form state management
- [Zod](https://zod.dev/) - Validation Library - TypeScript-first schema validation with static type inference

For UI, I use [shadcn/ui](https://ui.shadcn.com/) which offers beautiful, ready-made components.

### What would I add if I had more time?

- Better reusable Form components: I would follow [Tanstack Form Composition](https://tanstack.com/form/latest/docs/framework/react/guides/form-composition)
guide on implementing Custom Form Hooks, allowing for less boilerplate and duplication
when declaring form fields.

- Fix some janky Form validation going on in Login Form, just look at this weird stuff

https://github.com/user-attachments/assets/b46867be-c31e-4883-9e29-83b5ed898a86

.mp4)

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run dev

# build
$ pnpm run build
```
