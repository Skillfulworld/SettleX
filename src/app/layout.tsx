"use client";
import type { Metadata } from "next";
import "./globals.css";
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { dynamicConfig } from '@/lib/dynamic/client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <DynamicContextProvider {...dynamicConfig}>
        <body>{children}</body>
      </DynamicContextProvider>
    </html>
  );
}
