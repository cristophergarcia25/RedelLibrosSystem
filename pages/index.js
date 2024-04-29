import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import LoginPage from './components/LoginPage/[...index]';

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
    // <h1 className={styles.title}>
    //   Read <Link href="/posts/first-post">this page!</Link>
    // </h1>
  );






}
