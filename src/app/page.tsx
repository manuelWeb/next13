import { headers } from 'next/headers'
import SearchInput from "@/components/SearchInput";
import Providers from "@/components/Provider";
import Preloader from "@/components/Preloader";

import { store } from "@/store";
import { setStartupPokemon } from "@/store/searchSlice";

import styles from '@/app/home.module.scss';
import { Roboto, Quicksand } from '@next/font/google';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export default async function Home() {
  const req = await fetch("http://localhost:3000/api/search");
  const data = await req.json();
  store.dispatch(setStartupPokemon(data));

  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return (
    <main className={roboto.className}>
      <h1>Using Next.js headers API</h1>
      <h2 className={[quicksand.className, styles.heading24,].join(' ')}>{`Device details: ${userAgent}`}</h2>
      <h2 className={[styles.device, styles.para16, quicksand.className].join(' ')}>{isMobileView ? 'You are using a mobile device.' : 'You are using a PC.'}</h2>

      <Preloader pokemons={data} />

      <Providers>
        <SearchInput />
      </Providers>
    </main>
  );
}
