import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morocco Building Project Organizer",
  description: "Manage your construction projects in Morocco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
