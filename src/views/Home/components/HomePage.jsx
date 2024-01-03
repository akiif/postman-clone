"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./HomePage.module.css";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  const handleRedirect = (location) => {
    router.push(`/${location}`);
  };

  return (
    <main className={styles.main}>
      <Box>
        <Button onClick={() => handleRedirect("login")}>Login</Button>
        <Button onClick={() => handleRedirect("api-request")}>
          Continue without login
        </Button>
      </Box>
    </main>
  );
}

export default HomePage;
