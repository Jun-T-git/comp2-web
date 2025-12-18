"use client";

import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo_header.png"
            alt="キギョヒカ"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
        <div className="ml-auto flex items-center gap-4">
          {/* Future navigation items can go here */}
        </div>
      </div>
    </header>
  );
}
