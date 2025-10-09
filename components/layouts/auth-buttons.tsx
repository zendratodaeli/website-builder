"use client"

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import React from "react";
import { Button } from "../ui/button";

const AuthButtons = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button className="" variant={"outline"}>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Start for free</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default AuthButtons;