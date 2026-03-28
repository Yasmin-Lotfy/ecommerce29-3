"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, loginTypeSchema } from "@/schemas/auth.schemas";
import { loginUser } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: loginTypeSchema) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // callbackUrl:"/products"
    });
    console.log(response);
    if (response?.ok) {
      router.push("/products");
      toast.success("User login Successfully");
      //  tmam
    } else {
      toast.error(response?.error || "User login Failed");
    }
  }

  return (
    <>
      <main className="mt-30">
        <div className="max-w-5xl mx-auto">
          <Card className="p-10">
            <h2 className="text-2xl font-bold my-4">
              Login Now and Start Shopping
            </h2>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleLogin)}
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Email"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Password"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button className="w-full my-7" type="submit">
                Login
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </>
  );
}
