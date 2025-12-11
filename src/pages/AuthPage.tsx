import { useState } from 'react';
import {useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'signup';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background-light dark:bg-background-dark p-6">
      {/* Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
        {/* Left Column: Hero Text */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary text-xs font-bold uppercase tracking-wider">New Batch Starting</span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
              Master English <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Like a Native.</span>
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-lg lg:text-xl font-normal leading-relaxed max-w-md">
              Join our community of 10,000+ fluent speakers. Personalized lessons, radiant progress tracking, and native conversations.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-4">
              <div className="size-12 rounded-full border-2 border-background-dark bg-gray-700"></div>
              <div className="size-12 rounded-full border-2 border-background-dark bg-gray-600"></div>
              <div className="size-12 rounded-full border-2 border-background-dark bg-gray-500"></div>
              <div className="size-12 rounded-full border-2 border-background-dark bg-surface-highlight flex items-center justify-center text-xs font-bold text-white">
                +2k
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 text-primary">
                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-sm fill">star</span>)}
              </div>
              <p className="text-slate-700 dark:text-white text-sm font-medium">Rated 4.9/5 by learners</p>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/30 to-transparent rounded-[2.2rem] blur opacity-75"></div>
          <Card className="relative border-surface-border bg-surface-dark/95 backdrop-blur-sm shadow-2xl rounded-2xl">
            <CardContent className="p-8 flex flex-col gap-6">
              <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'signup')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-input-dark p-1">
                  <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-background-dark">Create Account</TabsTrigger>
                  <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-background-dark">Log In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Input id="name" placeholder="e.g. Jane Doe" className="pl-4 rounded-xl bg-input-dark border-surface-border" />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">person</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="name@example.com" className="rounded-xl bg-input-dark border-surface-border" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="At least 8 characters" className="rounded-xl bg-input-dark border-surface-border" />
                  </div>

                  <Button size="lg" className="w-full rounded-full bg-primary text-background-dark font-bold hover:bg-[#2fd16f] mt-2 group">
                    Get Started
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Button>
                </TabsContent>

                <TabsContent value="login" className="flex flex-col gap-4 mt-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input id="login-email" type="email" placeholder="name@example.com" className="rounded-xl bg-input-dark border-surface-border" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" placeholder="••••••••" className="rounded-xl bg-input-dark border-surface-border" />
                  </div>

                  <Button size="lg" className="w-full rounded-full bg-primary text-background-dark font-bold hover:bg-[#2fd16f] mt-2">
                    Log In
                  </Button>
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
                <Button variant="outline" className="rounded-full border-surface-border bg-transparent hover:bg-surface-border">
                  Google
                </Button>
                <Button variant="outline" className="rounded-full border-surface-border bg-transparent hover:bg-surface-border">
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
