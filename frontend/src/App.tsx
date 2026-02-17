import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { Container, Box, Typography, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import { useAssets } from './hooks/useAssets';
import { useFilter } from './hooks/useFilter';
import { useDarkMode } from './hooks/useDarkMode';

import AssetForm from './components/AssetForm';
import AssetCard from './components/AssetCard';
import AssetDetailModal from './components/AssetDetailModal';
import Dashboard from './components/Dashboard';

import { Asset, CATEGORIES } from './types/Asset';
import { exportToExcel, exportToPDF } from './utils/exportUtils';

import {
  TextField,
  Paper,
  Box as MuiBox,
  InputAdornment,
  Chip,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function App() {
  const { darkMode, theme, toggleDarkMode } = useDarkMode();
  const {
    assets,
    formData,
    setFormData,
    editingId,
    loading,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancelEdit,
  } = useAssets();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    handleCategoryToggle,
    clearFilters,
    filteredAssets,
    paginatedAssets,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useFilter(assets);

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <Container maxWidth="lg" sx={{ py: 4 }}>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              📦 My Assets Management
            </Typography>
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <Button
                onClick={toggleDarkMode}
                variant="contained"
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 3,
                  minWidth: 'auto',
                  p: 1.5,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' },
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </Button>
            </Box>
          </Box>

          {/* Form */}
          <AssetForm
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            darkMode={darkMode}
          />

          {/* Search */}
          <Paper
            elevation={4}
            sx={{
              p: 2, mb: 3,
              background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255,255,255,0.95)',
              borderRadius: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="🔍 Search by name or serial number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#667eea' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#667eea' },
                  '&.Mui-focused fieldset': { borderColor: '#667eea' },
                },
              }}
            />
          </Paper>

          {/* Dashboard */}
          <Dashboard assets={assets} />

          {/* Category Filter */}
          <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="🌐 All"
              onClick={() => clearFilters()}
              sx={{
                fontWeight: 600,
                background: !selectedCategory
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.9)',
                color: !selectedCategory ? 'white' : '#667eea',
                cursor: 'pointer',
              }}
            />
            {CATEGORIES.map((cat) => (
              <Chip
                key={cat.value}
                label={cat.label}
                onClick={() => handleCategoryToggle(cat.value)}
                sx={{
                  fontWeight: 600,
                  background: selectedCategory === cat.value
                    ? cat.color : 'rgba(255,255,255,0.9)',
                  color: selectedCategory === cat.value ? 'white' : cat.color,
                  border: `1px solid ${cat.color}60`,
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>

          {/* Assets Header */}
          <Box sx={{
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}>
            <Typography variant="h5" sx={{
              color: 'white',
              fontWeight: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}>
              📋 Assets List ({filteredAssets.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => exportToExcel(filteredAssets)}
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' },
                }}
              >
                Excel
              </Button>
              <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
                onClick={() => exportToPDF(filteredAssets)}
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' },
                }}
              >
                PDF
              </Button>
            </Box>
          </Box>

          {/* Assets Grid */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 3,
          }}>
            {paginatedAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetails={handleViewDetails}
              />
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Paper elevation={4} sx={{
                px: 3, py: 2,
                background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255,255,255,0.95)',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {((currentPage - 1) * 6) + 1}–{Math.min(currentPage * 6, filteredAssets.length)} of {filteredAssets.length}
                </Typography>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  color="primary"
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                      },
                    },
                  }}
                />
              </Paper>
            </Box>
          )}

          {/* Empty States */}
          {filteredAssets.length === 0 && assets.length > 0 && (
            <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(255,255,255,0.9)', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                🔍 No assets found
              </Typography>
              <Button variant="outlined" onClick={clearFilters} sx={{ mt: 2 }}>
                Clear Filters
              </Button>
            </Paper>
          )}

          {assets.length === 0 && !loading && (
            <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(255,255,255,0.9)', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary">
                📭 No assets yet. Add your first asset above!
              </Typography>
            </Paper>
          )}

          {/* Modal */}
          <AssetDetailModal
            asset={selectedAsset}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Toast */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            draggable
            pauseOnHover
            theme={darkMode ? 'dark' : 'light'}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;