import styles from "./TitleSubtitle.module.css";
interface TitleSubtitleProps {
  title: string;
  subtitle: string;
}

export const TitleSubtitle = ({ title, subtitle }: TitleSubtitleProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
