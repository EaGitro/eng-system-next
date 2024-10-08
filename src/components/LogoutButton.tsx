"use client";

import { signOut } from "next-auth/react";

// import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <button className="w-full" onClick={() => signOut()}>
      ログアウト
    </button>
  );
}