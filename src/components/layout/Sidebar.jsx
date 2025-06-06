// import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LuSearch, LuPlus, LuBookmark, LuMessageCircle, LuLogOut } from 'react-icons/lu';
import { FiHome } from 'react-icons/fi';
import { SIDEBAR_ITEMS } from '../../constants/dashboard';
import { useAuth } from '../../hooks/useAuth';

const iconMap = {
  home: FiHome,
  search: LuSearch,
  plus: LuPlus,
  bookmark: LuBookmark,
  'message-circle': LuMessageCircle,
};

const DRAWER_WIDTH = 280;

const Sidebar = ({ activeSection, onSectionChange, mobileOpen, onMobileToggle }) => {
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
  };

  const handleItemClick = (sectionId) => {
    onSectionChange(sectionId);
    if (isMobile) {
      onMobileToggle();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mt: 8, flex: 1 }}>
        <List>
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = activeSection === item.id;

            return (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleItemClick(item.id)}
                  sx={{
                    mx: 2,
                    mb: 1,
                    borderRadius: 2,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'white' : 'inherit' }}>
                    <Icon size={24} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LuLogOut size={20} />}
          onClick={handleLogout}
          color="error"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
