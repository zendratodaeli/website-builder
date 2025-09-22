import React from "react";
import Logo from "./logo";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "../core/container";
import AuthButtons from "./auth-buttons";
import { SignedIn } from "@clerk/nextjs";

const Header = async () => {
  return (
    <header className="sticky top-0 bg-background z-10">
      <Container className="flex justify-between">
        <Logo />
        <div className="space-x-2 flex items-center gap-2">
          <SignedIn>
            <Button asChild>
              <Link href={"/projects"}>Launch</Link>
            </Button>
          </SignedIn>

          <AuthButtons />
        </div>
      </Container>
    </header>
  );
};

export default Header;
