import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
  Avatar,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Save as SaveIcon,
  Badge as BadgeIcon,
  Groups as GroupsIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

function formatCNIC(value) {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  const p1 = digits.slice(0, 5);
  const p2 = digits.slice(5, 12);
  const p3 = digits.slice(12, 13);

  return [p1, p2, p3].filter(Boolean).join("-");
}

const initialProfile = {
  name: "Shaheer Ahmed",
  CNIC: "",
  classOfStudy: "",
  studyGroup: "",
};

export default function StudentProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [cnicError, setCnicError] = useState("");
  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "CNIC") {
      const formatted = formatCNIC(value);

      setProfile((prev) => ({
        ...prev,
        CNIC: formatted,
      }));

      setCnicError(
        formatted.length === 15 && !CNIC_REGEX.test(formatted)
          ? "CNIC must match 12345-1234567-1"
          : ""
      );
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();

    if (!CNIC_REGEX.test(profile.CNIC)) {
      setCnicError("CNIC must match the pattern 12345-1234567-1");
      return;
    }

    // TODO: Call your API here

    setToast(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 750,
        mx: "auto",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#004124 0%,#059669 100%)",
          px: 4,
          py: 4,
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "rgba(255,255,255,.15)",
              color: "#fff",
              fontSize: 28,
              fontWeight: 700,
              border: "2px solid rgba(255,255,255,.4)",
            }}
          >
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "S"}
          </Avatar>

          <Box flex={1}>
            <Typography variant="h6" color="white" fontWeight={700}>
              {profile.name || "Student"}
            </Typography>

            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {profile.classOfStudy && (
                <Chip
                  size="small"
                  icon={<SchoolIcon sx={{ color: "#fff !important" }} />}
                  label={profile.classOfStudy}
                  sx={{
                    bgcolor: "rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                />
              )}

              {profile.studyGroup && (
                <Chip
                  size="small"
                  icon={<GroupsIcon sx={{ color: "#fff !important" }} />}
                  label={profile.studyGroup}
                  sx={{
                    bgcolor: "rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                />
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>

      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Complete Your Profile
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSaveSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              value={profile.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <BadgeIcon
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                    }}
                  />
                ),
              }}
            />

            <TextField
              label="CNIC"
              name="CNIC"
              fullWidth
              required
              value={profile.CNIC}
              onChange={handleChange}
              placeholder="12345-1234567-1"
              inputProps={{ maxLength: 15 }}
              error={Boolean(cnicError)}
              helperText={cnicError || "Format: 12345-1234567-1"}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <TextField
                select
                label="Study Group"
                name="studyGroup"
                fullWidth
                required
                value={profile.studyGroup}
                onChange={handleChange}
              >
                <MenuItem value="Pre Medical">
                  Pre Medical
                </MenuItem>

                <MenuItem value="Pre Engineering">
                  Pre Engineering
                </MenuItem>

                <MenuItem value="Computer Science">
                  Computer Science
                </MenuItem>
              </TextField>

              <TextField
                select
                label="Class / Semester"
                name="classOfStudy"
                fullWidth
                required
                value={profile.classOfStudy}
                onChange={handleChange}
              >
                {[...Array(12)].map((_, i) => (
                  <MenuItem
                    key={`class-${i + 1}`}
                    value={`Class ${i + 1}`}
                  >
                    Class {i + 1}
                  </MenuItem>
                ))}

                {[...Array(8)].map((_, i) => (
                  <MenuItem
                    key={`semester-${i + 1}`}
                    value={`Semester ${i + 1}`}
                  >
                    Semester {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
                px: 3,
                py: 1.2,
                fontWeight: 600,
              }}
            >
              Save Profile
            </Button>
          </Stack>
        </Box>
      </CardContent>

      <Snackbar
        open={toast}
        autoHideDuration={3000}
        onClose={() => setToast(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setToast(false)}
        >
          Profile updated successfully.
        </Alert>
      </Snackbar>
    </Card>
  );
}