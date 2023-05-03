import styles from "./VideoContents.module.css";
import { VideoContentsSectionValues } from "@/types";

export default function VideoContentsView({
  heading,
  description,
  youtubeId,
}: Omit<VideoContentsSectionValues, "enable">) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerContents}>
        <div className={styles.textWrapper}>
          <h3 className={styles.heading}>{heading}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.videoWrapper}>
          {youtubeId && (
            <iframe
              className={styles.youtube}
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
