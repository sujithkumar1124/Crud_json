import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography
} from "@mui/material";

export default function Adduser() {
  const [adduser, setAdduser] = useState({ name: "", age: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!adduser.name.trim() || !adduser.age) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/", adduser);

      alert("User added successfully ✅");
      setAdduser({ name: "", age: "" });
      navigate("/");
    } catch (error) {
      console.error("Error adding user:", error);
      alert(
        error.response?.data?.message || "Failed to add user. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 2, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Add User
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={adduser.name}
              onChange={(e) =>
                setAdduser({ ...adduser, name: e.target.value })
              }
            />

            <TextField
              fullWidth
              label="Age"
              type="number"
              variant="outlined"
              margin="normal"
              value={adduser.age}
              onChange={(e) =>
                setAdduser({ ...adduser, age: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
