import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poweresume - AI-Powered Resume Tailor",
  description: "Transform your resume with AI-powered tailoring for any job posting. ATS-friendly templates, real-time editing, and professional LaTeX output.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
