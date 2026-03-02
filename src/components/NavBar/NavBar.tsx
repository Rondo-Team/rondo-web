"use client";

import { UserProfile } from "@/components/UserProfile";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((currentState) => !currentState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navBar}>
      <Link href={AppSectionsRoutes.HOME} className={styles.rondoComposition}>
        <Image
          src="/rondo-icon.webp"
          alt="Rondo Icon"
          width={50}
          height={50}
          className={styles.rondoImage}
        />
        <h2>Rondo</h2>
      </Link>

      <button
        type="button"
        className={styles.menuButton}
        onClick={toggleMenu}
      >
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
      </button>

      <div
        className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`.trim()}
      >
        <Link href={AppSectionsRoutes.HOME} onClick={closeMenu}>
          Home
        </Link>
        <Link href={AppSectionsRoutes.CREATE} onClick={closeMenu}>
          Create
        </Link>
        <Link href={AppSectionsRoutes.COMMUNITY} onClick={closeMenu}>
          Community
        </Link>
        <Link href={AppSectionsRoutes.MY_TACTICS} onClick={closeMenu}>
          My Tactics
        </Link>
        <div className={styles.mobileUserProfile}>
          <UserProfile />
        </div>
      </div>

      <div className={styles.desktopUserProfile}>
        <UserProfile />
      </div>
    </nav>
  );
};
