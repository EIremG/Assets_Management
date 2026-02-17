import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagIcon from '@mui/icons-material/Tag';
import CategoryIcon from '@mui/icons-material/Category';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Asset, getCategoryColor, getCategoryLabel } from '../types/Asset';

interface AssetDetailModalProps {
  asset: Asset | null;
  open: boolean;
  onClose: () => void;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  open,
  onClose,
  onEdit,
  onDelete
}) => {
  if (!asset) return null;

  const categoryColor = getCategoryColor(asset.category);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          borderTop: `6px solid ${categoryColor}`,
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2c3e50' }}>
            Asset Details
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', p: 0.5, color: 'text.secondary' }}
          >
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>

      <Divider />

      {/* Content */}
      <DialogContent sx={{ pt: 3 }}>
        {/* Category Chip */}
        <Box sx={{ mb: 3 }}>
          <Chip
            label={getCategoryLabel(asset.category)}
            sx={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
              fontWeight: 600,
              border: `1px solid ${categoryColor}40`,
              fontSize: '0.9rem',
              height: 32
            }}
          />
        </Box>

        {/* Asset Name */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#2c3e50', mb: 3 }}
        >
          {asset.name}
        </Typography>

        {/* Details */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* ID */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Box sx={{
              width: 40, height: 40,
              borderRadius: 2,
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea'
            }}>
              #
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                ASSET ID
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                {asset.id}
              </Typography>
            </Box>
          </Box>

          {/* Serial No */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Box sx={{
              width: 40, height: 40,
              borderRadius: 2,
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea'
            }}>
              <TagIcon />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                SERIAL NUMBER
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {asset.serialNo}
              </Typography>
            </Box>
          </Box>

          {/* Category */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: `${categoryColor}10`,
            border: `1px solid ${categoryColor}20`
          }}>
            <Box sx={{
              width: 40, height: 40,
              borderRadius: 2,
              backgroundColor: `${categoryColor}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: categoryColor
            }}>
              <CategoryIcon />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                CATEGORY
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: categoryColor }}>
                {getCategoryLabel(asset.category)}
              </Typography>
            </Box>
          </Box>

          {/* Assign Date */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(102, 126, 234, 0.05)',
            border: '1px solid rgba(102, 126, 234, 0.1)'
          }}>
            <Box sx={{
              width: 40, height: 40,
              borderRadius: 2,
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea'
            }}>
              <CalendarTodayIcon />
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                ASSIGN DATE
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {new Date(asset.assignDate).toLocaleDateString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => {
            onEdit(asset);
            onClose();
          }}
          sx={{
            borderColor: '#667eea',
            color: '#667eea',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#667eea',
              background: 'rgba(102, 126, 234, 0.1)'
            }
          }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => {
            if (asset.id) {
              onDelete(asset.id);
              onClose();
            }
          }}
          sx={{ fontWeight: 600 }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontWeight: 600,
            ml: 'auto'
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetDetailModal;