import React from 'react';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Asset, AssetCategory, CATEGORIES } from '../types/Asset';

interface AssetFormProps {
  formData: Asset;
  setFormData: (data: Asset) => void;
  editingId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const AssetForm: React.FC<AssetFormProps> = ({
  formData,
  setFormData,
  editingId,
  onSubmit,
  onCancel,
  darkMode,
}) => {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        mb: 4,
        background: darkMode ? 'rgba(30,30,50,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#667eea' }}>
        {editingId ? '✏️ Edit Asset' : '➕ Add New Asset'}
      </Typography>

      <form onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              sx={{ flex: '1 1 200px' }}
              label="Asset Name"
              placeholder="e.g., Laptop Dell XPS"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              inputProps={{ minLength: 2, maxLength: 100 }}
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
                value={formData.category || AssetCategory.OTHER}
                label="Category"
                onChange={(e) => setFormData({
                  ...formData,
                  category: e.target.value as AssetCategory
                })}
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{
                        width: 12,
                        height: 12,
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
              },
            }}
          >
            {editingId ? 'Update Asset' : 'Add Asset'}
          </Button>

          {editingId && (
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{ borderColor: '#667eea', color: '#667eea' }}
            >
              Cancel Edit
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default AssetForm;