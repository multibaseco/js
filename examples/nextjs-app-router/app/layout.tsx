import "./globals.css";
import { MBProvider } from '@/app/providers';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <MBProvider>
                    {children}
                </MBProvider>
            </body>
        </html>
    );
}
