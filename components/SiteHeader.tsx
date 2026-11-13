import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, Show, SignInButton, SignUpButton, useAuth, UserButton} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { PlanButton } from "@/components/PlanButton";

export default function SiteHeader() {
  const pathname = usePathname();

  const {isSignedIn} = useAuth();
  const isLandingPage = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/10 bg-background/80 px-6 backdrop-blur-md md:px-10">
      {/* Left side: Logo */}
      <Link href={isSignedIn && !isLandingPage ? "/dashboard" : "/"} className="flex items-center">
        <Image
          src="/brand/logo-navbar-dark.png"
          alt="Outpost Logo"
          width={314} 
          height={160}
          className="h-8 w-auto"
          priority
        />
      </Link>

      {/* Right side: Navigation Links */}
      {isLandingPage && (
        <nav className="flex items-center gap-8 text-sm text-muted-foreground">
          <Link href="#product" className="transition hover:text-white">
            Product
          </Link>
          <Link href="#how-it-works" className="transition hover:text-white">
            How it works
          </Link>
          <Link href="#pricing" className="transition hover:text-white">
            Pricing
          </Link>
        </nav>
      )}

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </SignInButton>

          <SignUpButton>
            <Button size="sm">Get started</Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <OrganizationSwitcher
          afterCreateOrganizationUrl="/dashboard"
          afterSelectOrganizationUrl="/dashboard"
          />

          {isLandingPage ? (
            <Button asChild size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : ( 
            <PlanButton />
          )}
          <UserButton/>
        </Show>
      </div>
    </header>
  ); 
}