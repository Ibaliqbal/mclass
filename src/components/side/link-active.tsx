"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, ReactNode } from "react";

const LinkActive = ({
  href,
  text,
  active,
  nonActive,
  ...rest
}: {
  href: string;
  text: string;
  active: ReactNode;
  nonActive: ReactNode;
} & ComponentPropsWithoutRef<"a">) => {
  const pathname = usePathname();
  return (
    <Link href={href} {...rest}>
      {pathname === href ? active : nonActive} {text}
    </Link>
  );
};

export default LinkActive;
