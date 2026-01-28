import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  TextField
} from "@mui/material";

export default function Viewuser() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: "", age: "" });
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    axios.get("http://localhost:3000/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete user
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        setUsers(users.filter((u) => u._id !== id));
      })
      .catch((err) => console.error(err));
    alert("User Deleted successfully!")
  };

  // Start edit
  const handleEdit = (user) => {
    setEditId(user._id);
    setEditData({ name: user.name, age: user.age });
  };

  // Update user
  const handleUpdate = (id) => {
    axios.put(`http://localhost:3000/update/${id}`, editData)
      .then((res) => {
        setUsers(users.map((u) => (u._id === id ? res.data : u)));
        setEditId(null);
      })
      .catch((err) => console.error(err));
    alert("User Updated successfully!")
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" mb={3}>
        User List
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/Add')}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto" }}>

        <Table>

          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={headStyle}>Name</TableCell>
              <TableCell sx={headStyle}>Age</TableCell>
              <TableCell sx={headStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">
                  {editId === user._id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>

                <TableCell align="center">
                  {editId === user._id ? (
                    <TextField
                      type="number"
                      value={editData.age}
                      onChange={(e) =>
                        setEditData({ ...editData, age: e.target.value })
                      }
                    />
                  ) : (
                    user.age
                  )}
                </TableCell>

                <TableCell align="center">
                  {editId === user._id ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdate(user._id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 1 }}
                    >
                      Update
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(user._id)}

                  >
                    Delete
                  </Button>


                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  );
}

const headStyle = {
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
};
