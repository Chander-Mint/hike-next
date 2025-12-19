import { Toaster } from "react-hot-toast";
import "./globals.css"
import dynamic from 'next/dynamic';

const WebLayout = dynamic(
    () => import('./components/WebLayout'),
    { ssr: false }
);

// export const metadata = {
//     title: "Hike",
//     description: "Explore the world of trekking and mountaineering with Hike. Join us for adventures, training, and tours.",
//     viewport: 'width=device-width, initial-scale=1.0',
// };

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Mansalva&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body suppressHydrationWarning>
                <Toaster
                    position="top-right"
                    richColors
                    duration={3000}
                    toastOptions={{
                        style: { zIndex: 9999 },
                    }}
                />
                <div id="root">
                    <WebLayout>{children}</WebLayout>
                </div>
            </body>
        </html>
    );
}