import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: "RememberMe-d",
    description: "Tu adherencia terapéutica, siempre contigo.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={nunito.variable}>
        <body className="font-sans antialiased">{children}</body>
        </html>
    );
}