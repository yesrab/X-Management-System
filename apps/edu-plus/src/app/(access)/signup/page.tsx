import { SignupForm } from "@/components/access/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | X Management System",
  description: "Login to your X Management System account to access your dashboard.",
};

export default function SignupPage() {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-4xl'>
        <SignupForm />
      </div>
    </div>
  );
}
