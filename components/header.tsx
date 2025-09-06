import React from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";
import Container from "./core/container";

const Header = () => {
  return (
    <header className="sticky top-0 bg-background">
      <Container className="flex justify-between">
        <Logo />
        <Button asChild>
          <Link href={"/projects"}>Launch</Link>
        </Button>
      </Container>
    </header>
  );
};

export default Header;