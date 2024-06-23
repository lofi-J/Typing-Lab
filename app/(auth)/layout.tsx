export const metadata = {
  title: 'Auth | Lofi Typing',
  description: 'Lofi Typing Login',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
