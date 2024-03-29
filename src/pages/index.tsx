import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>UI Framer Motion</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <div className="flex min-h-screen items-start bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-40">
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
            <div className="grid grid-cols-1 divide-y divide-gray-400">
              <Link
                href={"/multistep-wizard"}
                className="cursor-pointer p-8 hover:bg-slate-200"
              >
                Multistep wizard
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/email-client"}
              >
                Email Client
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/header"}
              >
                Header
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/carousel"}
              >
                Carousel
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/resizable-panel"}
              >
                Resizable Panel
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/calendar"}
              >
                Calendar
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/animated-tabs"}
              >
                Animated Tabs
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/animated-toggle"}
              >
                Animated Toggle
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/trello-checklist"}
              >
                Trello Checklist
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/radix-dropdown"}
              >
                Radix Dropdown
              </Link>
              <Link
                className="cursor-pointer p-8 hover:bg-slate-200"
                href={"/card-radial-gradient"}
              >
                Card Radial Gradient
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
