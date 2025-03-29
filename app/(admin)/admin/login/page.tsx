"use client";
import Image from "next/image";
import Link from "next/link";

import bikeImage from "@/app/assets/images/bike.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { setCookie } from "@/app/actions/cookie-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ADMIN_USER_LOGIN } from "@/gql/admin";
import { useToast } from "@/hooks/use-toast";
import { ROUTE_PATH } from "@/lib/constant";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {

  const { push } = useRouter();
  const { toast } = useToast();

  const [adminLogin, { loading }] = useMutation(ADMIN_USER_LOGIN);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const response = await adminLogin({
        variables: {
          adminUserSignIn: {
            email: values.email,
            password: values.password
          }
        }
      });
      const { adminUserSignIn } = response.data;
      if (adminUserSignIn) {
        toast({
          title: 'Logged In Successfully',
        })
        const { accessToken, refreshToken } = adminUserSignIn;
        await setCookie('accessToken', accessToken)
        await setCookie('refreshToken', refreshToken)
        push(ROUTE_PATH.ADMIN.dashboard)
      }
      console.log('Mutation result:', response);
    } catch (mutationError) {
      console.error('Submission error:', mutationError);
    }
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" isLoading={loading} className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image src={bikeImage} alt="Image" />
      </div>
    </div>
  );
}
