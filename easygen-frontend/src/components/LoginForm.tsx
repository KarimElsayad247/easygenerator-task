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

const LoginFormSchema = z.object({
  email: z.email({ error: 'Not a valid email address' }),
  password: z.string().min(1, {error: "Password must not be empty"}),
});

export function LoginForm({
                            className,
                            ...props
                          }: React.ComponentProps<'div'>) {

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: LoginFormSchema,
      onBlur: LoginFormSchema,
      onSubmit: LoginFormSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                  {/* I would implement this if I have time, but it's out of scope for the task */}
                  {/*<a*/}
                  {/*  href="#"*/}
                  {/*  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"*/}
                  {/*>*/}
                  {/*  Forgot your password?*/}
                  {/*</a>*/}
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
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
