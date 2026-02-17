import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Asset, CATEGORIES } from './types/Asset';
import { assetService } from './services/assetService';
import AssetCard from './components/AssetCard';
import Dashboard from './components/Dashboard';
import AssetDetailModal from './components/AssetDetailModal';
import { exportToExcel, exportToPDF } from './utils/exportUtils';

function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 6;
  const [formData, setFormData] = useState<Asset>({
    name: '',
    serialNo: '',
    assignDate: new Date().toISOString().split('T')[0],
    category: 'Other',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const fetchAssets = async () => {
    try {
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (error) {
      showSnackbar('Failed to fetch assets', 'error');
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.serialNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      !selectedCategory || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await assetService.updateAsset(editingId, formData);
        showSnackbar('Asset updated successfully! ✏️', 'success');
      } else {
        await assetService.addAsset(formData);
        showSnackbar('Asset added successfully! 🎉', 'success');
      }
      setFormData({ 
        name: '', 
        serialNo: '', 
        assignDate: new Date().toISOString().split('T')[0],
        category: 'Other'
      });
      setEditingId(null);
      fetchAssets();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'An error occurred';
      showSnackbar(errorMsg, 'error');
    }
  };

  const handleEdit = (asset: Asset) => {
    setFormData({
      name: asset.name,
      serialNo: asset.serialNo,
      assignDate: asset.assignDate,
      category: asset.category || 'Other',
    });
    setEditingId(asset.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await assetService.deleteAsset(id);
        showSnackbar('Asset deleted successfully! 🗑️', 'success');
        fetchAssets();
      } catch (error) {
        showSnackbar('Failed to delete asset', 'error');
      }
    }
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    if (severity === 'success') {
      toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              📦 My Assets Management
            </Typography>
            
            {/* Dark Mode Toggle */}
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <Button
                variant="contained"
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 3,
                  minWidth: 'auto',
                  p: 1.5,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' }
                }}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </Button>
            </Box>
          </Box>

          {/* Form */}
          <Paper 
            elevation={6} 
            sx={{ 
              p: 4, mb: 4,
              background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#667eea' }}>
              {editingId ? '✏️ Edit Asset' : '➕ Add New Asset'}
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <TextField
                    sx={{ flex: '1 1 200px' }}
                    label="Asset Name"
                    placeholder="e.g., Laptop Dell XPS"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <TextField
                    sx={{ flex: '1 1 200px' }}
                    label="Serial Number"
                    placeholder="e.g., SN001"
                    value={formData.serialNo}
                    onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                    required
                  />
                  <TextField
                    sx={{ flex: '1 1 200px' }}
                    type="date"
                    label="Assign Date"
                    value={formData.assignDate}
                    onChange={(e) => setFormData({ ...formData, assignDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                  <FormControl sx={{ flex: '1 1 200px' }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category || 'Other'}
                      label="Category"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.map((cat) => (
                        <MenuItem key={cat.value} value={cat.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ 
                              width: 12, height: 12, 
                              borderRadius: '50%', 
                              backgroundColor: cat.color 
                            }} />
                            {cat.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  {editingId ? 'Update Asset' : 'Add Asset'}
                </Button>
                
                {editingId && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setFormData({ 
                        name: '', serialNo: '', 
                        assignDate: new Date().toISOString().split('T')[0], 
                        category: 'Other' 
                      });
                      setEditingId(null);
                    }}
                    sx={{ borderColor: '#667eea', color: '#667eea' }}
                  >
                    Cancel Edit
                  </Button>
                )}
              </Box>
            </form>
          </Paper>

          {/* Search Bar */}
          <Paper 
            elevation={4} 
            sx={{ 
              p: 2, mb: 3,
              background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderRadius: 3 
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
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="🌐 All"
                onClick={() => setSelectedCategory(null)}
                sx={{
                  fontWeight: 600,
                  background: !selectedCategory
  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  : darkMode
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.9)',

color: !selectedCategory
  ? 'white'
  : darkMode
    ? 'white'
    : '#667eea',
                  cursor: 'pointer'
                }}
              />
              {CATEGORIES.map((cat) => (
                <Chip
                  key={cat.value}
                  label={cat.label}
                  onClick={() => setSelectedCategory(
                    selectedCategory === cat.value ? null : cat.value
                  )}
                  sx={{
                    fontWeight: 600,
                    background: selectedCategory === cat.value
  ? cat.color
  : darkMode
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(255,255,255,0.9)',

color: selectedCategory === cat.value
  ? 'white'
  : darkMode
    ? 'white'
    : cat.color,
                    border: `1px solid ${cat.color}60`,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Assets List Header */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              📋 Assets List ({filteredAssets.length})
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => exportToExcel(filteredAssets)}
                sx={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' }
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
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  fontWeight: 600,
                  '&:hover': { background: 'rgba(255,255,255,0.3)' }
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
            gap: 3
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
              <Paper
                elevation={4}
                sx={{
                  px: 3, py: 2,
                  background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255, 255, 255, 0.95)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAssets.length)} of {filteredAssets.length} assets
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
                      }
                    }
                  }}
                />
              </Paper>
            </Box>
          )}

          {/* Empty States */}
          {filteredAssets.length === 0 && assets.length > 0 && (
            <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                🔍 No assets found
              </Typography>
              <Button variant="outlined" onClick={() => { setSearchTerm(''); setSelectedCategory(null); }} sx={{ mt: 2 }}>
                Clear Filters
              </Button>
            </Paper>
          )}

          {assets.length === 0 && (
            <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3 }}>
              <Typography variant="h6" color="text.secondary">
                📭 No assets yet. Add your first asset above!
              </Typography>
            </Paper>
          )}

          {/* Asset Detail Modal */}
          <AssetDetailModal
            asset={selectedAsset}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Toast Container */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
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