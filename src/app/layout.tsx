import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/home/FooterSection";

export const metadata = {
  title: "1 Noble Healthcare",
  description: "Your all-round care provider.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
