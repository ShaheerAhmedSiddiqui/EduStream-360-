import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  Save as SaveIcon,
  Badge as BadgeIcon,
  Groups as GroupsIcon,
  School as SchoolIcon,
} from "@mui/icons-material";

// ==========================================
// 🔴 DYNAMIC IMPORT: API Service Integration
// ==========================================
import { studentService } from "../../services/api";

// STATIC HELPER: CNIC Regex Format Validation
const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

// STATIC HELPER: Auto-formats raw digits to 12345-1234567-1 format
function formatCNIC(value) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "").slice(0, 13);
  const p1 = digits.slice(0, 5);
  const p2 = digits.slice(5, 12);
  const p3 = digits.slice(12, 13);

  return [p1, p2, p3].filter(Boolean).join("-");
}

export default function StudentProfile() {
  // ==========================================
  // 🔴 DYNAMIC STATE: Reactive Data Holders
  // ==========================================
  const [profile, setProfile] = useState({
    name: "",
    CNIC: "",
    classOfStudy: "",
    studyGroup: "",
  });

  const [loading, setLoading] = useState(true); // Tracks initial GET fetch
  const [saving, setSaving] = useState(false);   // Tracks PUT/POST update progress
  const [cnicError, setCnicError] = useState("");
  
  // Dynamic Toast Notification State
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ==========================================
  // 🔴 DYNAMIC API CALL: Fetch Profile Data on Mount
  // ==========================================
  useEffect(() => {
    async function fetchProfileData() {
      try {
        setLoading(true);
        // Call GET API endpoint
        const data = await studentService.getProfile();
        
        if (data) {
          setProfile({
            name: data.name || "",
            CNIC: formatCNIC(data.CNIC || ""),
            classOfStudy: data.classOfStudy || "",
            studyGroup: data.studyGroup || "",
          });
        }
      } catch (err) {
        setToast({
          open: true,
          message: err.response?.data?.message || "Failed to load student profile.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  // ==========================================
  // 🟢 DYNAMIC FORM INPUT HANDLER
  // ==========================================
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

  // ==========================================
  // 🔴 DYNAMIC API CALL: Submit Profile Updates
  // ==========================================
  const handleSaveSubmit = async (e) => {
    e.preventDefault();

    if (!CNIC_REGEX.test(profile.CNIC)) {
      setCnicError("CNIC must match the pattern 12345-1234567-1");
      return;
    }

    try {
      setSaving(true);

      // Call PUT API endpoint with dynamic state
      await studentService.updateProfile(profile);

      setToast({
        open: true,
        message: "Profile updated successfully.",
        severity: "success",
      });
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || "Failed to update profile.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // 🔵 STATIC UI LOADING FALLBACK
  // ==========================================
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

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
      {/* ==========================================
          🔵 STATIC UI / DYNAMIC CONTENT HEADER
         ========================================== */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#004124 0%,#059669 100%)",
          px: 4,
          py: 4,
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="center">
          {/* 🔴 DYNAMIC: Derived Avatar Letter */}
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
            {profile.name ? profile.name.charAt(0).toUpperCase() : "S"}
          </Avatar>

          <Box flex={1}>
            {/* 🔴 DYNAMIC: Bound User Name */}
            <Typography variant="h6" color="white" fontWeight={700}>
              {profile.name || "Student"}
            </Typography>

            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {/* 🔴 DYNAMIC: Conditional Badge Chip */}
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

              {/* 🔴 DYNAMIC: Conditional Group Chip */}
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

      {/* ==========================================
          🔵 FORM & INPUT FIELDS
         ========================================== */}
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Complete Your Profile
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSaveSubmit}>
          <Stack spacing={2.5}>
            {/* Full Name Input */}
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              value={profile.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <BadgeIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />

            {/* CNIC Input */}
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

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              {/* Study Group Dropdown */}
              <TextField
                select
                label="Study Group"
                name="studyGroup"
                fullWidth
                required
                value={profile.studyGroup}
                onChange={handleChange}
              >
                <MenuItem value="Pre Medical">Pre Medical</MenuItem>
                <MenuItem value="Pre Engineering">Pre Engineering</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
              </TextField>

              {/* 🔴 DYNAMIC LOOP: Class/Semester Options Generator */}
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
                  <MenuItem key={`class-${i + 1}`} value={`Class ${i + 1}`}>
                    Class {i + 1}
                  </MenuItem>
                ))}

                {[...Array(8)].map((_, i) => (
                  <MenuItem key={`semester-${i + 1}`} value={`Semester ${i + 1}`}>
                    Semester {i + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* 🔴 DYNAMIC BUTTON: Disables when API call is pending */}
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              sx={{
                alignSelf: "flex-start",
                textTransform: "none",
                px: 3,
                py: 1.2,
                fontWeight: 600,
              }}
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </Button>
          </Stack>
        </Box>
      </CardContent>

      {/* ==========================================
          🔴 DYNAMIC TOAST NOTIFICATION
         ========================================== */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}