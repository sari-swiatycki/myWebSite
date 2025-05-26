


"use client"

import { useEffect, useState } from "react"
import { Box, Grid, Button, Typography, Skeleton, Chip, Fade, Tooltip } from "@mui/material"
import { styled } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootStore } from "../Stores/songStore"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import AlbumIcon from "@mui/icons-material/Album"
import HeadphonesIcon from "@mui/icons-material/Headphones"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import QueueMusicIcon from "@mui/icons-material/QueueMusic"
import { fetchCategories } from "../Slices/SongSlice"
import { fetchSongsByCategory } from "../Slices/actionSongSlice"

// Styled category button
const CategoryButton = styled(Button)<{ selected?: boolean }>(({ selected }) => ({
  borderRadius: 50,
  padding: "12px 20px",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "0.95rem",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: selected ? "0 6px 15px rgba(41, 182, 246, 0.3)" : "none",
  color: selected ? "#fff" : "#bbb",
  backgroundColor: selected ? "#29B6F6" : "#212121",
  borderColor: "#333",
  "&:hover": {
    backgroundColor: "#29B6F6",
    color: "#fff",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(41, 182, 246, 0.4)",
  },
}))

// Get appropriate icon for different category types
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes("rock") || name.includes("pop") || name.includes("jazz")) {
    return <MusicNoteIcon />
  } else if (name.includes("album") || name.includes("classic")) {
    return <AlbumIcon />
  } else if (name.includes("playlist") || name.includes("collection")) {
    return <LibraryMusicIcon />
  } else if (name.includes("dance") || name.includes("electronic")) {
    return <QueueMusicIcon />
  } else if (name.includes("hip hop") || name.includes("rap")) {
    return <PlaylistPlayIcon />
  } else {
    return <HeadphonesIcon />
  }
}

// Get category description
const getCategoryDescription = (categoryName: string) => {
  const name = categoryName.toLowerCase()
  if (name.includes("rock")) {
    return "From classic to alternative - find your rock anthem"
  } else if (name.includes("pop")) {
    return "Chart-topping hits and catchy melodies"
  } else if (name.includes("jazz")) {
    return "Smooth rhythms and improvisational masterpieces"
  } else if (name.includes("classic")) {
    return "Timeless compositions from the greatest maestros"
  } else if (name.includes("hip hop") || name.includes("rap")) {
    return "Beats, rhymes and urban poetry in motion"
  } else if (name.includes("electronic") || name.includes("dance")) {
    return "Digital soundscapes and pulsing dance floor rhythms"
  } else if (name.includes("indie")) {
    return "Underground treasures and independent artists"
  } else {
    return "Explore this unique collection of sounds"
  }
}

interface CategoryListProps {
  onCategorySelect?: () => void
}

const CategoryList = ({ onCategorySelect }: CategoryListProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, loading, error } = useSelector((state: RootStore) => state.songs)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [activeCategories, setActiveCategories] = useState<number[]>([])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId)

    // Add to active categories for animation effect
    if (!activeCategories.includes(categoryId)) {
      setActiveCategories([...activeCategories, categoryId])
    }

    dispatch(fetchSongsByCategory(categoryId))

    // Scroll to songs list after category selection
    if (onCategorySelect) {
      onCategorySelect()
    }
  }

  // Render loading skeletons when loading
  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 3, backgroundColor: "#121212", borderRadius: 3 }}>
        <Grid container spacing={2} justifyContent="center">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item key={item} xs={6} sm={4} md={2}>
              <Skeleton variant="rounded" width="100%" height={48} animation="wave" sx={{ bgcolor: "#222" }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  // Render error message
  if (error) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 3,
          backgroundColor: "#FF4444",
          borderRadius: 3,
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" fontWeight="medium">
          Error loading categories: {error}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Please try refreshing the page or check your connection
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: "100%",
        px: 3,
        py: 4,
        backgroundColor: "#121212",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="#fff">
          Popular Categories
        </Typography>

        <Chip
          label={`${categories.length} unique genres`}
          size="small"
          sx={{
            backgroundColor: "#333",
            color: "#29B6F6",
            fontWeight: "medium",
            borderRadius: 6,
          }}
        />
      </Box>

      <Typography variant="body2" color="#aaa" sx={{ mb: 3 }}>
        Discover your next favorite sound among our carefully curated selection of musical categories
      </Typography>

      <Grid container spacing={2} justifyContent="flex-start">
        {categories.map((category) => (
          <Grid item key={category.id} xs={6} sm={4} md={2}>
            <Fade in={true} timeout={500 + categories.indexOf(category) * 100}>
              <Box>
                <Tooltip title={getCategoryDescription(category.name)} arrow placement="top">
                  <CategoryButton
                    fullWidth
                    selected={selectedCategory === category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    startIcon={getCategoryIcon(category.name)}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      "&::after": activeCategories.includes(category.id)
                        ? {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "radial-gradient(circle, rgba(41,182,246,0.3) 0%, rgba(0,0,0,0) 70%)",
                            animation: "ripple 1s ease-out forwards",
                            borderRadius: "inherit",
                          }
                        : {},
                    }}
                  >
                    {category.name}
                  </CategoryButton>
                </Tooltip>
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, p: 2, backgroundColor: "rgba(41, 182, 246, 0.1)", borderRadius: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#29B6F6",
            textAlign: "center",
            fontStyle: "italic",
            fontWeight: "medium",
          }}
        >
          Each category features handpicked selections from our extensive music library. Click any genre to start your
          musical journey.
        </Typography>
      </Box>

      <style>{`
        @keyframes ripple {
          0% {
            opacity: 1;
            transform: scale(0.1);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
      `}</style>
    </Box>
  )
}

export default CategoryList
