import NavBar from "./components/NavBar"
import CircleStdFont from "next/font/local"

export const CircleStdFontStyle = CircleStdFont({ src: '../font/CircularStd-Book.ttf' })

export const metadata = {
  title: 'KoroKoro',
  description: 'A novel way to view items for sale!',
  icons: {
    icon: '/view.png',
  },
  creator: 'Dahiru Ibrahim',
}


export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={CircleStdFontStyle.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
