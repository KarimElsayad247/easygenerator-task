import { cn, fieldShouldReportError } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod/v4';
import { InputError } from '@/components/ui/InputError.tsx';

const RegistrationFormSchema = z.object({
  username: z.string().min(3, { error: 'Name must have a minimum of 3 characters' }),
  email: z.email({ error: 'Not a valid email address' }),
  // Password Schema from https://github.com/colinhacks/zod/discussions/3412#discussioncomment-9916377
  password: z.string()
    .min(8)
    .refine(password => /[A-Za-z]/.test(password), { error: 'Password must have at least 1 letter' })
    .refine(password => /[0-9]/.test(password), { error: 'Password must have at least 1 digit' })
    .refine(password => /[^A-Za-z0-9]/.test(password), { error: 'Password must have at least 1 special character' }),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  error: 'Password confirmation does not match password',
  path: ['passwordConfirmation'],
});

export function SignupForm({
                             className,
                             ...props
                           }: React.ComponentProps<'div'>) {

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validators: {
      onChange: RegistrationFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your email, and choose an email and password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Name</Label>
                <form.Field
                  name={'username'}
                  children={({ state, ...field }) => (
                    <>
                      <Input
                        type="text"
                        id={field.name}
                        value={state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={fieldShouldReportError(state) ? 'invalid' : ''}
                        placeholder="John"
                        required
                      />
                      {state.meta.errors[0] && fieldShouldReportError(state) &&
                        <InputError message={state.meta.errors[0].message} />}
                    </>
                  )}
                />


              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <form.Field
                  name={'email'}
                  children={({ state, ...field }) => (
                    <>
                      <Input
                        type="email"
                        id={field.name}
                        value={state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={fieldShouldReportError(state) ? 'invalid' : ''}
                        placeholder="m@example.com"
                        required
                      />
                      {state.meta.errors[0] && fieldShouldReportError(state) &&
                        <InputError message={state.meta.errors[0].message} />}
                    </>

                  )}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <form.Field
                  name={'password'}
                  children={({ state, ...field }) => (
                    <>
                      <Input
                        type="password"
                        id={field.name}
                        value={state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={fieldShouldReportError(state) ? 'invalid' : ''}
                        required
                      />
                      {state.meta.errors[0] && fieldShouldReportError(state) &&
                        <InputError message={state.meta.errors[0].message} />}
                    </>
                  )}
                />

              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
                </div>
                <form.Field
                  name={'passwordConfirmation'}
                  children={({ state, ...field }) => (
                    <>
                      <Input
                        type="password"
                        id={field.name}
                        value={state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={fieldShouldReportError(state) ? 'invalid' : ''}
                        required
                      />
                      {state.meta.errors[0] && fieldShouldReportError(state) &&
                        <InputError message={state.meta.errors[0].message} />}
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link to="/sign-in" className="underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
