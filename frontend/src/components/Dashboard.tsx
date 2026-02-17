import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import { Asset } from '../types/Asset';

interface DashboardProps {
  assets: Asset[];
}

const Dashboard: React.FC<DashboardProps> = ({ assets }) => {
  const totalAssets = assets.length;
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const assetsThisMonth = assets.filter(asset => {
    const assetDate = new Date(asset.assignDate);
    return assetDate.getMonth() === currentMonth && assetDate.getFullYear() === currentYear;
  }).length;
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const assetsThisWeek = assets.filter(asset => 
    new Date(asset.assignDate) >= oneWeekAgo
  ).length;
  
  const latestAsset = assets.length > 0 
    ? assets.reduce((latest, asset) => 
        new Date(asset.assignDate) > new Date(latest.assignDate) ? asset : latest
      )
    : null;

  const stats = [
    {
      title: 'Total Assets',
      value: totalAssets,
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: '#667eea',
      bgColor: 'rgba(102, 126, 234, 0.1)',
    },
    {
      title: 'Added This Month',
      value: assetsThisMonth,
      icon: <CalendarTodayIcon sx={{ fontSize: 40 }} />,
      color: '#f093fb',
      bgColor: 'rgba(240, 147, 251, 0.1)',
    },
    {
      title: 'Added This Week',
      value: assetsThisWeek,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#4facfe',
      bgColor: 'rgba(79, 172, 254, 0.1)',
    },
    {
      title: 'Latest Asset',
      value: latestAsset ? latestAsset.name : 'N/A',
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: '#43e97b',
      bgColor: 'rgba(67, 233, 123, 0.1)',
      isText: true,
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: 'white',
          fontWeight: 600,
          mb: 3,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        📊 Dashboard
      </Typography>
      
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3
        }}
      >
        {stats.map((stat, index) => (
          <Paper
            key={index}
            elevation={4}
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: stat.bgColor,
                  color: stat.color,
                }}
              >
                {stat.icon}
              </Box>
            </Box>
            
            {stat.isText ? (
  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 0.5 }}>
    {stat.value}
  </Typography>
) : (
  <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50', mb: 0.5 }}>
    {stat.value}
  </Typography>
)}
            
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              {stat.title}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;