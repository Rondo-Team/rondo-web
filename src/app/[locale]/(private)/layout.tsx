import { NavBar } from "@/components/NavBar/NavBar";
import styles from "./layout.module.css";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.content}>{children}</main>
    </div>
  );
}
