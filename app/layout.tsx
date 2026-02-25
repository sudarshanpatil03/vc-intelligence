import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "VC Intelligence",
  description: "VC Discovery Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
            <h2 className="text-xl font-bold mb-8 text-blue-600">
              VC Intelligence
            </h2>

            <nav className="space-y-4 text-gray-700">
              <Link href="/companies" className="block hover:text-blue-600">
                Companies
              </Link>

              <Link href="/lists" className="block hover:text-blue-600">
                Saved List
              </Link>

              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-10 bg-gray-50">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}