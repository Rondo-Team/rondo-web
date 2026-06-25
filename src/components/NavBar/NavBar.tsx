"use client";

import { LogoutIcon } from "@/components/Icons/LogoutIcon";
import { UserProfile } from "@/components/UserProfile";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./NavBar.module.css";

interface NavBarProps {
  username?: string;
  name?: string;
  onSignOut: () => void;
}

export const NavBar = ({ name, username, onSignOut }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userProfileData = name && username ? { name, username } : null;

  const t = useTranslations("navBar");

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
          width={25}
          height={25}
          className={styles.rondoImage}
        />
        <h2>Rondo</h2>
      </Link>

      <button type="button" className={styles.menuButton} onClick={toggleMenu}>
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
      </button>

      <div
        className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`.trim()}
      >
        <Link
          href={AppSectionsRoutes.HOME}
          className={styles.navLinksText}
          onClick={closeMenu}
        >
          {t("navSections.home")}
        </Link>
        <Link
          href={AppSectionsRoutes.CREATE}
          className={styles.navLinksText}
          onClick={closeMenu}
        >
          {t("navSections.create")}
        </Link>
        <Link
          href={AppSectionsRoutes.COMMUNITY}
          className={styles.navLinksText}
          onClick={closeMenu}
        >
          {t("navSections.community")}
        </Link>
        <Link
          href={AppSectionsRoutes.MY_TACTICS}
          className={styles.navLinksText}
          onClick={closeMenu}
        >
          {t("navSections.myTactics")}
        </Link>
        {userProfileData && (
          <div className={styles.mobileUserProfile}>
            <UserProfile
              name={userProfileData.name}
              username={userProfileData.username}
            />
            <button
              type="button"
              className={styles.signOutButton}
              onClick={() => {
                closeMenu();
                onSignOut();
              }}
              aria-label={t("signOut")}
            >
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>

      {userProfileData && (
        <div className={styles.desktopUserProfile}>
          <UserProfile
            name={userProfileData.name}
            username={userProfileData.username}
          />
          <button
            type="button"
            className={styles.signOutButton}
            onClick={onSignOut}
            aria-label={t("signOut")}
          >
            <LogoutIcon />
          </button>
        </div>
      )}
    </nav>
  );
};
