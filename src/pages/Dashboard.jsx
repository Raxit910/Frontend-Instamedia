import { useState } from 'react';
import {
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import { LuMenu } from 'react-icons/lu';
import { DASHBOARD_SECTIONS } from '../constants/dashboard';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import PostFeed from '../components/sections/PostFeed';
import SearchSection from '../components/sections/SearchSection';
import CreatePost from '../components/sections/CreatePost';
import SavedPosts from '../components/sections/SavedPosts';
import Messages from '../components/sections/Messages';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(DASHBOARD_SECTIONS.HOME);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case DASHBOARD_SECTIONS.HOME:
        return <PostFeed />;
      case DASHBOARD_SECTIONS.SEARCH:
        return <SearchSection />;
      case DASHBOARD_SECTIONS.CREATE:
        return <CreatePost />;
      case DASHBOARD_SECTIONS.SAVED:
        return <SavedPosts />;
      case DASHBOARD_SECTIONS.MESSAGES:
        return <Messages />;
      default:
        return <PostFeed />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header />

      {/* Mobile menu button */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            top: 64, // Below main header
            left: 0,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 1,
            zIndex: 1200,
          }}
        >
          <Toolbar sx={{ minHeight: '48px !important' }}>
            <IconButton edge="start" onClick={handleMobileToggle} sx={{ color: 'text.primary' }}>
              <LuMenu size={24} />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        mobileOpen={mobileOpen}
        onMobileToggle={handleMobileToggle}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 280px)` },
          mt: { xs: isMobile ? '112px' : '64px', md: '64px' },
          minHeight: `calc(100vh - 64px)`,
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {renderMainContent()}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
