import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthActions } from '@convex-dev/auth/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
// import { Icon } from '@/components/ui/MaterialIconHelper'; // Removed unused import
import { Loader2, User, Mail, Lock, Check } from 'lucide-react';

// --- Zod Schemas ---
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  // confirmPassword: z.string(), // Simplified for now based on snippet, user had confirmPassword but let's stick to core first or add it.
  image: z.string().optional(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

const AVATARS = [
  "https://api.dicebear.com/7.x/notionists/svg?seed=Felix",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Milo",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Bella",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Leo",
  "https://api.dicebear.com/7.x/notionists/svg?seed=Zoe",
];

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuthActions();

  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- Sign In Form ---
  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSignIn = (values: SignInValues) => {
    setLoading(true);
    setError("");
    signIn("password", { email: values.email, password: values.password, flow: "signIn" })
      .then(() => {
        toast.success("Welcome back!");
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid email or password"); // Simplify error message for user
        toast.error("Failed to sign in");
      })
      .finally(() => setLoading(false));
  };

  // --- Sign Up Form ---
  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", image: AVATARS[0] },
  });

  const onSignUp = (values: SignUpValues) => {
    setLoading(true);
    setError("");
    signIn("password", {
      email: values.email,
      password: values.password,
      name: values.name,
      image: values.image ?? "",
      flow: "signUp"
    })
      .then(() => {
        toast.success("Account created successfully!");
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setError("Could not create account. Try again.");
        toast.error("Sign up failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background-light dark:bg-background-dark p-6">
      <motion.div
        animate={{
          background: mode === 'login' ? 'radial-gradient(circle at 100% 0%, rgba(54,226,123,0.1) 0%, transparent 50%)' : 'radial-gradient(circle at 0% 100%, rgba(59,130,246,0.1) 0%, transparent 50%)'
        }}
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
      />

      {/* Background Effects */}
      <motion.div
        animate={{ x: mode === 'login' ? 0 : 50, y: mode === 'login' ? 0 : -50 }}
        transition={{ duration: 1.5, type: 'spring' }}
        className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      ></motion.div>
      <motion.div
        animate={{ x: mode === 'login' ? 0 : -50, y: mode === 'login' ? 0 : 50 }}
        transition={{ duration: 1.5, type: 'spring' }}
        className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none"
      ></motion.div>

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
        {/* Left Column: Hero Text */}
        <div className="flex flex-col gap-8 hidden lg:flex">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">Join 10,000+ Learners</span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
              Master English <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Like a Native.</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg lg:text-xl font-normal leading-relaxed max-w-md">
              Create an account to track your progress, save tough idioms, and compete on the leaderboard.
            </p>
          </div>
        </div>

        {/* Right Column: Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-transparent rounded-[2.2rem] blur opacity-75"></div>
          <Card className="relative border-surface-border bg-surface-dark/95 backdrop-blur-sm shadow-2xl rounded-2xl">
            <CardContent className="p-8 flex flex-col gap-6">
              <Tabs value={mode} onValueChange={(v) => { setMode(v as 'login' | 'signup'); setError(""); }} className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-input-dark p-1 mb-6">
                  <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-background-dark">Create Account</TabsTrigger>
                  <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-background-dark">Log In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="flex flex-col gap-4">

                      {/* Avatar Selection */}
                      <FormField
                        control={signUpForm.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Choose Avatar</FormLabel>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                              {AVATARS.map((avatar) => (
                                <div
                                  key={avatar}
                                  onClick={() => field.onChange(avatar)}
                                  className={`relative cursor-pointer rounded-full p-1 border-2 transition-all shrink-0 ${field.value === avatar ? 'border-primary bg-primary/10' : 'border-accent  hover:bg-white/5'}`}
                                >
                                  <img src={avatar} alt="avatar" className="size-10 rounded-full" />
                                  {field.value === avatar && (
                                    <div className="absolute -bottom-1 -right-1 bg-primary text-black rounded-full p-0.5">
                                      <Check className="size-3" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input placeholder="John Doe" className="pl-10 bg-input-dark border-surface-border focus:border-green-500 focus:ring-0" {...field} />
                              </FormControl>
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input placeholder="john@example.com" className="pl-10 bg-input-dark border-surface-border" {...field} />
                              </FormControl>
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input type="password" placeholder="••••••••" className="pl-10 bg-input-dark border-surface-border" {...field} />
                              </FormControl>
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                      <Button type="submit" className="w-full rounded-full mt-2 font-bold" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="login">
                  <Form {...signInForm}>
                    <form onSubmit={signInForm.handleSubmit(onSignIn)} className="flex flex-col gap-4">

                      <FormField
                        control={signInForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input placeholder="john@example.com" className="pl-10 bg-input-dark border-surface-border" {...field} />
                              </FormControl>
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signInForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input type="password" placeholder="••••••••" className="pl-10 bg-input-dark border-surface-border" {...field} />
                              </FormControl>
                              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                      <Button type="submit" className="w-full rounded-full mt-2 font-bold" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Log In"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-surface-dark px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="rounded-full border-surface-border bg-transparent hover:bg-surface-border" onClick={() => signIn("google")}>
                  Google
                </Button>
                <Button variant="outline" className="rounded-full border-surface-border bg-transparent hover:bg-surface-border" onClick={() => signIn("github")}>
                  GitHub
                </Button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-2">
                By joining, you agree to our Terms and Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
