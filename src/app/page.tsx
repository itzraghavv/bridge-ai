"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Debug logging
  console.log("HomePage render:", { user, loading, hasUser: !!user });

  // Fallback redirect in case middleware doesn't work
  useEffect(() => {
    if (!loading && user) {
      console.log("Redirecting to dashboard (client-side)");
      router.push("/dashboard"); // no full reload
    }
  }, [user, loading, router]);

  if (loading) {
    console.log("HomePage: Loading state");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    console.log("HomePage: User authenticated, should redirect");
    // Middleware will handle redirect to dashboard
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  console.log("HomePage: No user, showing auth forms");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Bridge</h1>
            </div>
            <Badge variant="secondary" className="hidden sm:block">
              Universal API Adapter
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Connect Any APIs with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Automatically generate bridges between different APIs using AI
              reasoning. Upload schemas, get intelligent mappings, and execute
              workflows seamlessly.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600">
                Intelligent schema parsing and field mapping using GroqAI
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Universal Adapter
              </h3>
              <p className="text-gray-600">
                Connect any API format - OpenAPI, JSON, or custom schemas
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure & Scalable
              </h3>
              <p className="text-gray-600">
                Built with Supabase and Prisma for enterprise-grade reliability
              </p>
            </div>
          </motion.div>
        </div>

        {/* Auth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {showSignUp ? "Create Account" : "Welcome Back"}
              </CardTitle>
              <CardDescription>
                {showSignUp
                  ? "Join AI Bridge to start connecting APIs"
                  : "Sign in to your AI Bridge account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showSignUp ? <SignUpForm /> : <LoginForm />}

              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => setShowSignUp(!showSignUp)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            See It In Action
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Weather API</h4>
                <p className="text-sm text-blue-700">
                  Temperature, condition, timestamp
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="h-0.5 w-8 bg-gray-300"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="h-0.5 w-8 bg-gray-300"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">
                  Calendar API
                </h4>
                <p className="text-sm text-green-700">
                  Event title, description, time
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>AI Generated Workflow:</strong> When weather API returns
                high temperature, create calendar event for heat advisory
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
