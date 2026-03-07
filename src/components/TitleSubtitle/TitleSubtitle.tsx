import styles from "./TitleSubtitle.module.css";
interface TitleSubtitleProps {
  title: string;
  subtitle: string;
  titleLineClamp?: boolean;
  subtitleLineClamp?: boolean;
}

export const TitleSubtitle = ({
  title,
  subtitle,
  titleLineClamp = false,
  subtitleLineClamp = false,
}: TitleSubtitleProps) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${titleLineClamp && styles.titleClamp}`}>
        {title}
      </h1>
      <p
        className={`${styles.subtitle} ${subtitleLineClamp && styles.subtitleClamp}`}
      >
        {subtitle}
      </p>
    </div>
  );
};
