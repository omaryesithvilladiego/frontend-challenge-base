"use client";

import React from "react";
import styles from "../../styles/header/Header.module.css";
import Image from "next/image";
import { IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";

const Header = (): JSX.Element => {
  const matches = useMediaQuery("(min-width:680px)");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <div className={styles.quickbetParent}>
              <b className={styles.quickbet}>QuiCkbet</b>

              <div className={styles.moviesParent}>
                <b className={styles.movies}>Movies</b>
                <Image
                  className={styles.groupChild}
                  alt=""
                  src="/Rectangle_1.svg"
                  width={35}
                  height={4}
                />
                <Image
                  className={styles.groupItem}
                  alt=""
                  src="/Rectangle_2.svg"
                  width={35}
                  height={4}
                />
                <div className={styles.groupInner} />
              </div>
            </div>
          </div>

          {matches && (
            <div className={styles.popular}>
              <div className={styles.btn}>Popular</div>
            </div>
          )}

          {matches && (
            <div className={styles.popular}>
              <div className={styles.botn}>Favorites</div>
            </div>
          )}
        </div>

        <div className="rightSide">
          {matches && (
            <Image
              alt="profileIcon"
              src="/ProfileIcon.svg"
              width={32}
              height={32}
            />
          )}
          {!matches && (
            <>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Image
                  alt="profileIcon"
                  src="/ProfileIcon.svg"
                  width={32}
                  height={32}
                />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <div className={styles.botn}>Favorites</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <div className={styles.botn}>Favorites</div>
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
