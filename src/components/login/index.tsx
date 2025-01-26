"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLoader, FiLock, FiLogOut, FiUser } from "react-icons/fi";

export function LoginComponent() {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }
  return (
    <>
      {status === "loading" && (
        <button className="animate-spin">
          <FiLoader size={26} color="#4b5563" />
        </button>
      )}

      {status === "unauthenticated" && (
        <button onClick={handleLogin}>
          <FiLock size={26} color="#4b5563" />
        </button>
      )}

      {status === "authenticated" && (
        <div className="flex items-baseline gap-4">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>

          <button onClick={handleLogout}>
            <FiLogOut size={26} color="#ff2313" />
          </button>
        </div>
      )}
    </>
  );
}
