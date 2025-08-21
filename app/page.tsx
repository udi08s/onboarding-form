import { OnboardingForm } from "@/components/onboarding-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome!</h1>
          <p className="text-muted-foreground">Please complete your profile to get started</p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  )
}
