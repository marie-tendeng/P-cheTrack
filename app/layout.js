import "./globals.css";
import "./dashboard.css";
import Nav from "./nav";

export const metadata = {
  title: "PêchTrack",
  description: "Pêcher • Suivre • Prospérer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <main className="container">{children}</main>
        <Nav />
      </body>
    </html>
  );
}
