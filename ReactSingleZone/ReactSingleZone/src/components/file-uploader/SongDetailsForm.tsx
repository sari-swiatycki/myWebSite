"use client"

import type React from "react"
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import AudiotrackIcon from "@mui/icons-material/Audiotrack"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import CategoryIcon from "@mui/icons-material/Category"

interface Category {
  id: number
  name: string
}

interface SongDetailsFormProps {
  title: string
  artist: string
  genere: string
  tags: string
  category: number
  categories: Category[]
  loading: boolean
  categoriesError: string | null
  onTitleChange: (value: string) => void
  onArtistChange: (value: string) => void
  onGenereChange: (value: string) => void
  onTagsChange: (value: string) => void
  onCategoryChange: (value: number) => void
}

const SongDetailsForm: React.FC<SongDetailsFormProps> = ({
  title,
  artist,
  genere,
  tags,
  category,
  categories,
  loading,
  categoriesError,
  onTitleChange,
  onArtistChange,
  onGenereChange,
  onTagsChange,
  onCategoryChange,
}) => {
  return (
    <Grid container spacing={3}>
      {/* Title */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Song Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AudiotrackIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Artist */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Artist"
          value={artist}
          onChange={(e) => onArtistChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MusicNoteIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Genre */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Genre"
          value={genere}
          onChange={(e) => onGenereChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LibraryMusicIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Category */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            value={category || ""}
            onChange={(e) => onCategoryChange(Number(e.target.value))}
            label="Category"
            disabled={loading}
            startAdornment={
              <InputAdornment position="start">
                <CategoryIcon color="primary" />
              </InputAdornment>
            }
          >
            <MenuItem value="" disabled>
              <em>Select a category</em>
            </MenuItem>
            {loading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Loading categories...
                </Typography>
              </MenuItem>
            ) : categoriesError ? (
              <MenuItem disabled>
                <Typography variant="body2" color="error">
                  Error loading categories
                </Typography>
              </MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>

      {/* Tags */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Tags"
          value={tags}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="Enter tags separated by commas"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LibraryMusicIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SongDetailsForm
