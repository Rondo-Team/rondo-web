import Image from "next/image";
import styles from "./RondoLoginComposition.module.css"

export const RondoLoginComposition = () => {
  return (
    <div className={styles.rondoInfoContainer}>
      <Image
        src="/rondo-icon.webp"
        alt="Rondo Icon"
        width={60}
        height={60}
        className={styles.rondoImage}
      />
      <h1>Rondo</h1>
    </div>
  );
};
