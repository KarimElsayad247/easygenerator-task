import {axiosInstance} from "@/apis/client.ts";
import type { SignInParams } from '@/types';

export interface SignInResult {
  access_token: string;
}

export const signIn = async (signInParams: SignInParams): Promise<SignInResult> => {
    const response = await axiosInstance.post('/auth/sign-in', {
        email: signInParams.email,
        password: signInParams.password
    });

    return response.data
}
