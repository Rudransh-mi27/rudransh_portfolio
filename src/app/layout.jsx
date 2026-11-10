import '@/styles/globals.scss';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070709',
};

export const metadata = {
  title: 'Rudransh Mishra — Full-Stack Developer & AI/ML Engineer',
  description:
    'Personal portfolio of Rudransh Mishra. B.Tech in CSE (AI & ML) at SRMU, focusing on robust backend engineering, full-stack web applications, and practical machine learning solutions.',
  keywords: [
    'Rudransh Mishra',
    'Full-Stack Developer',
    'Backend Engineer',
    'AI/ML',
    'React',
    'Next.js',
    'Node.js',
    'Portfolio',
    'MandiDarpan',
    'SRMU'
  ],
  authors: [{ name: 'Rudransh Mishra' }],
  creator: 'Rudransh Mishra',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Rudransh Mishra — Full-Stack Developer & AI/ML Engineer',
    description: 'Engineering systems driven by logic, reliability, and real-world utility.',
    url: 'https://github.com/Rudransh-mi27',
    siteName: 'Rudransh Mishra Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
