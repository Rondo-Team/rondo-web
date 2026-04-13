import styles from "./FootballPitch.module.css";

export const FootballPitch = () => {
  return (
    <svg
      className={styles.field}
      width="720"
      height="405"
      viewBox="0 0 720 405"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <rect width="5" height="405" fill="#DADADA" />
      <rect x="715" width="5" height="405" fill="#DADADA" />
      <rect x="357" width="5" height="405" fill="#DADADA" />
      <circle cx="360" cy="202" r="52.5" stroke="#DADADA" strokeWidth="5" />
      <rect
        y="405"
        width="4.99997"
        height="720"
        transform="rotate(-90 0 405)"
        fill="#DADADA"
      />
      <rect
        y="5"
        width="4.99997"
        height="720"
        transform="rotate(-90 0 5)"
        fill="#DADADA"
      />
      <path
        d="M0 377C13.451 378.265 24 390.316 24 405H19C19 392.823 10.4513 383.283 0 382.029V377Z"
        fill="#DADADA"
      />
      <rect
        x="2.5"
        y="98.5"
        width="90"
        height="208"
        stroke="#DADADA"
        strokeWidth="5"
      />
      <rect
        x="2.5"
        y="148.5"
        width="28"
        height="108"
        stroke="#DADADA"
        strokeWidth="5"
      />
      <path
        d="M28 0C26.7354 13.451 14.6837 24 2.86197e-07 24L2.26573e-07 19C12.1775 19 21.717 10.4513 22.9707 5.99738e-08L28 0Z"
        fill="#DADADA"
      />
      <path
        d="M90 161.166C103.192 165.633 113 182.443 113 202.5C113 222.557 103.192 239.367 90 243.834V238.466C93.6954 236.817 97.1716 233.857 100.128 229.669C104.894 222.917 108 213.327 108 202.5C108 191.673 104.894 182.083 100.128 175.331C97.1715 171.143 93.6955 168.182 90 166.533V161.166Z"
        fill="#DADADA"
      />
      <path
        d="M720 28C706.549 26.7354 696 14.6837 696 -2.09815e-06L701 -1.66103e-06C701 12.1775 709.549 21.717 720 22.9707L720 28Z"
        fill="#DADADA"
      />
      <rect
        x="717.5"
        y="306.5"
        width="90"
        height="208"
        transform="rotate(-180 717.5 306.5)"
        stroke="#DADADA"
        strokeWidth="5"
      />
      <rect
        x="717.5"
        y="256.5"
        width="28"
        height="108"
        transform="rotate(-180 717.5 256.5)"
        stroke="#DADADA"
        strokeWidth="5"
      />
      <path
        d="M692 405C693.265 391.549 705.316 381 720 381L720 386C707.823 386 698.283 394.549 697.029 405L692 405Z"
        fill="#DADADA"
      />
      <path
        d="M630 243.834C616.808 239.367 607 222.557 607 202.5C607 182.443 616.808 165.633 630 161.166L630 166.534C626.305 168.183 622.828 171.143 619.872 175.331C615.106 182.083 612 191.673 612 202.5C612 213.327 615.106 222.917 619.872 229.669C622.829 233.857 626.305 236.818 630 238.467L630 243.834Z"
        fill="#DADADA"
      />
    </svg>
  );
};
