"use client";

import { useSession } from "next-auth/react";
import AddProductForm from "@/components/AddProductForm";
import { Container, Typography } from "@mui/material";

type User = {
  email: string;
  role: string;
};

export default function AdminPage() {
  const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <p>
                Verifying session... This might take a few seconds. Please wait.
            </p>
        );
    }

  if (!session) {
    return <p>You must log in to access this page.</p>;
  }

  const user = session?.user as User;

  if (!user || user.role !== "admin") {
    return <p>Access denied! Only admins can see this page.</p>;
  }

  return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 8, textAlign: "center" }} >
      <Typography variant="h4" gutterBottom>
        Admin
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome, {user.email}!
      </Typography>
      <AddProductForm />
    </Container>
  );
}
