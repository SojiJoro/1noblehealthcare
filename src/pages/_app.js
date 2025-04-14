import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="container mx-auto p-6">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
