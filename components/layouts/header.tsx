"use client";

import React from "react";
import Logo from "./logo";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "../core/container";
import AuthButtons from "./auth-buttons";
import { SignedIn } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BackButton from "../core/back-button";

const Header = () => {
  const pathName = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevents hydration mismatch: render nothing until client hydration is complete
    return null;
  }
  const isProjectPage = pathName.includes("/projects/");
  const isLandingPage = pathName === "/";

  return (
    <header
      className={cn(
        "sticky top-0 bg-background z-60",
        isProjectPage && "dark"
      )}
      suppressHydrationWarning
    >
      <Container className="flex justify-between">
        <div className="flex items-center gap-4">
          <Logo isTextShown={!isProjectPage} />
          { isProjectPage && <BackButton/>}
        </div>
        <div className="space-x-2 flex items-center gap-2">
          { isLandingPage && <SignedIn>
            <Button asChild>
              <Link href={"/projects"}>Launch</Link>
            </Button>
          </SignedIn>}

          <AuthButtons />
        </div>
      </Container>
    </header>
  );
};

export default Header;
