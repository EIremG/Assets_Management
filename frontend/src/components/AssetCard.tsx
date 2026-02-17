import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button,
  Box,
  Chip,
  CardActionArea
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TagIcon from '@mui/icons-material/Tag';
import { useTheme } from '@mui/material/styles';
import { Asset, getCategoryColor, getCategoryLabel } from '../types/Asset';

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
  onViewDetails: (asset: Asset) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onEdit, onDelete, onViewDetails }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const categoryColor = getCategoryColor(asset.category);
  
  return (
    <Card
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background.paper',
    color: 'text.primary',
    backdropFilter: 'blur(10px)',
    borderRadius: 3,
    transition: 'all 0.3s ease',
    borderTop: `4px solid ${categoryColor}`,
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: (theme) => theme.shadows[8],
    },
  }}
  elevation={4}
>
      {/* Karta tıklayınca modal açılır */}
      <CardActionArea onClick={() => onViewDetails(asset)} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Kategori Chip */}
          <Box sx={{ mb: 2 }}>
            <Chip 
              label={getCategoryLabel(asset.category)}
              size="small"
              sx={{ 
                backgroundColor: `${categoryColor}20`,
                color: categoryColor,
                fontWeight: 600,
                border: `1px solid ${categoryColor}40`
              }} 
            />
          </Box>

          <Typography
           variant="h5"
           gutterBottom
           sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}
    >
            {asset.name}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TagIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Serial No:
              </Typography>
              <Chip 
                label={asset.serialNo} 
                size="small" 
                sx={{ 
                  fontWeight: 600,
                 background: (theme) =>
                 theme.palette.mode === 'dark'
                 ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                 : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Assigned:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {new Date(asset.assignDate).toLocaleDateString('en-GB')}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          size="small" 
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(asset);
          }}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover'
           }
         }}
        >
          Edit
        </Button>
        <Button 
          size="small" 
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={(e) => {
            e.stopPropagation();
            asset.id && onDelete(asset.id);
          }}
          sx={{ fontWeight: 600 }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default AssetCard;