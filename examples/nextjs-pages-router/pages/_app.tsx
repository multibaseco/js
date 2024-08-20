import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { init } from "@multibase/js";

init(process.env.NEXT_PUBLIC_MULTIBASE_KEY!);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
