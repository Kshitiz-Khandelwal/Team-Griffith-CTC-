"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [otpResendDisabled, setOtpResendDisabled] = useState(false)
  const [otpResendTimer, setOtpResendTimer] = useState(30)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginError, setLoginError] = useState("")
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  const [verificationStep, setVerificationStep] = useState(1)

  // Account creation form
  const [fullName, setFullName] = useState("")
  const [usn, setUsn] = useState("")
  const [branch, setBranch] = useState("")
  const [year, setYear] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Club representative login
  const [clubEmail, setClubEmail] = useState("")
  const [verificationKey, setVerificationKey] = useState("")
  const [clubLoginError, setClubLoginError] = useState("")

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.(edu)$/i
    return regex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 8
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }

  const handleLogin = () => {
    setEmailError("")
    setPasswordError("")
    setLoginError("")

    let hasError = false

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid .edu email address")
      hasError = true
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters")
      hasError = true
    }

    if (!hasError) {
      // In a real app, this would call an API to authenticate
      // For demo purposes, we'll just redirect to home
      router.push("/")
    }
  }

  const handleSendOtp = () => {
    setEmailError("")

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid .edu email address")
      return
    }

    // In a real app, this would send an OTP to the user's email
    setOtpSent(true)

    // Disable resend button for 30 seconds
    setOtpResendDisabled(true)
    let timer = 30
    const interval = setInterval(() => {
      timer -= 1
      setOtpResendTimer(timer)

      if (timer <= 0) {
        clearInterval(interval)
        setOtpResendDisabled(false)
      }
    }, 1000)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP with the server
    // For demo purposes, we'll just proceed to the next step
    if (createAccount) {
      setVerificationStep(2)
    } else {
      router.push("/")
    }
  }

  const handleResetPassword = () => {
    if (!validateEmail(resetEmail)) {
      return
    }

    // In a real app, this would send a password reset link
    setResetEmailSent(true)

    // Close the dialog after 3 seconds
    setTimeout(() => {
      setForgotPasswordOpen(false)
      setResetEmailSent(false)
      setResetEmail("")
    }, 3000)
  }

  const handleCreateAccount = () => {
    // In a real app, this would create the user account
    // For demo purposes, we'll just redirect to home
    router.push("/")
  }

  const handleClubLogin = () => {
    setClubLoginError("")

    if (!validateEmail(clubEmail)) {
      setClubLoginError("Please enter a valid email address")
      return
    }

    if (!verificationKey) {
      setClubLoginError("Please enter your verification key")
      return
    }

    // In a real app, this would verify the club credentials
    // For demo purposes, we'll just redirect to home
    router.push("/")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Cook the Code
          </CardTitle>
          <CardDescription>{createAccount ? "Create your account" : "Sign in to access campus events"}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="club">Club Representative</TabsTrigger>
            </TabsList>

            <TabsContent value="student" className="mt-6">
              {!createAccount ? (
                // Login form
                <div className="space-y-4">
                  {loginError && (
                    <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {loginError}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">College Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={emailError ? "border-destructive" : ""}
                    />
                    {emailError && <p className="text-destructive text-sm">{emailError}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Forgot Password?
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                              Enter your email address and we'll send you a link to reset your password.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            {resetEmailSent ? (
                              <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 p-3 rounded-md flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <p>Password reset link sent to your email!</p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Label htmlFor="reset-email">Email Address</Label>
                                <Input
                                  id="reset-email"
                                  type="email"
                                  placeholder="your.name@university.edu"
                                  value={resetEmail}
                                  onChange={(e) => setResetEmail(e.target.value)}
                                />
                              </div>
                            )}
                          </div>
                          <DialogFooter>
                            {!resetEmailSent && <Button onClick={handleResetPassword}>Send Reset Link</Button>}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={passwordError ? "border-destructive pr-10" : "pr-10"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-sm"
                      onClick={() => {
                        setCreateAccount(true)
                        setOtpSent(false)
                        setVerificationStep(1)
                      }}
                    >
                      Don't have an account? Create one
                    </Button>
                  </div>
                </div>
              ) : (
                // Account creation form
                <div className="space-y-4">
                  {verificationStep === 1 ? (
                    // Step 1: Email verification
                    !otpSent ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="create-email">College Email</Label>
                          <Input
                            id="create-email"
                            type="email"
                            placeholder="your.name@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? "border-destructive" : ""}
                          />
                          {emailError ? (
                            <p className="text-destructive text-sm">{emailError}</p>
                          ) : (
                            <p className="text-sm text-muted-foreground">Please use your university email address</p>
                          )}
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={handleSendOtp}
                        >
                          Verify Email (Send OTP)
                        </Button>

                        <div className="text-center">
                          <Button variant="link" className="text-sm" onClick={() => setCreateAccount(false)}>
                            Already have an account? Sign in
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // OTP verification
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="otp">Verification Code</Label>
                          <p className="text-sm text-muted-foreground mb-4">We've sent a 6-digit code to {email}</p>
                          <div className="flex justify-between gap-2">
                            {otp.map((digit, index) => (
                              <Input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                className="w-12 h-12 text-center text-lg"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                autoFocus={index === 0}
                              />
                            ))}
                          </div>
                        </div>

                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={handleVerifyOtp}
                        >
                          Verify & Continue
                        </Button>

                        <div className="flex justify-between items-center">
                          <Button variant="link" className="text-sm p-0" onClick={() => setOtpSent(false)}>
                            Change Email
                          </Button>

                          <Button
                            variant="link"
                            className="text-sm p-0"
                            disabled={otpResendDisabled}
                            onClick={handleSendOtp}
                          >
                            {otpResendDisabled ? `Resend OTP (${otpResendTimer}s)` : "Resend OTP"}
                          </Button>
                        </div>
                      </div>
                    )
                  ) : (
                    // Step 2: Personal information
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input
                          id="full-name"
                          placeholder="Enter your full name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="usn">University Serial Number (USN)</Label>
                        <Input
                          id="usn"
                          placeholder="Enter your USN"
                          value={usn}
                          onChange={(e) => setUsn(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch/Department</Label>
                          <Select value={branch} onValueChange={setBranch}>
                            <SelectTrigger id="branch">
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cs">Computer Science</SelectItem>
                              <SelectItem value="ece">Electronics & Communication</SelectItem>
                              <SelectItem value="me">Mechanical Engineering</SelectItem>
                              <SelectItem value="civil">Civil Engineering</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="year">Year of Study</Label>
                          <Select value={year} onValueChange={setYear}>
                            <SelectTrigger id="year">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st Year</SelectItem>
                              <SelectItem value="2">2nd Year</SelectItem>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">Create Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value)
                              calculatePasswordStrength(e.target.value)
                            }}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <Progress value={passwordStrength} className="h-1" />
                          <p className="text-xs text-muted-foreground">
                            Password must be at least 8 characters with 1 uppercase letter and 1 special character
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={confirmPassword && confirmPassword !== newPassword ? "border-destructive" : ""}
                        />
                        {confirmPassword && confirmPassword !== newPassword && (
                          <p className="text-destructive text-sm">Passwords do not match</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                          </a>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="profile-picture">Profile Picture (Optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload a profile picture (PNG/JPG, max 2MB)
                          </p>
                          <Button variant="outline" size="sm">
                            Choose File
                          </Button>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handleCreateAccount}
                        disabled={
                          !fullName ||
                          !usn ||
                          !branch ||
                          !year ||
                          !newPassword ||
                          newPassword !== confirmPassword ||
                          !agreeToTerms
                        }
                      >
                        Create Account
                      </Button>

                      <div className="text-center">
                        <Button variant="link" className="text-sm" onClick={() => setVerificationStep(1)}>
                          Back to Email Verification
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="club" className="mt-6">
              <div className="space-y-4">
                {clubLoginError && (
                  <div className="bg-destructive/15 text-destructive p-3 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {clubLoginError}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="club-email">Club Email</Label>
                  <Input
                    id="club-email"
                    type="email"
                    placeholder="clubname@university.edu"
                    value={clubEmail}
                    onChange={(e) => setClubEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verification-key">Verification Key</Label>
                  <div className="relative">
                    <Input
                      id="verification-key"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter verification key"
                      value={verificationKey}
                      onChange={(e) => setVerificationKey(e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleClubLogin}
                >
                  Login
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Resend Verification Key
                  </Button>
                </div>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Trouble Logging In? Contact Support
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-center w-full">
            <Button variant="link" className="text-sm text-muted-foreground">
              Need help signing in?
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

