import * as React from 'react';
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import { Menu as MenuIcon, MusicNote, LibraryMusic, ArrowCircleDown } from '@mui/icons-material';
import { useRouter } from 'next/router';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { text: 'Tracks', href: '/tracks', icon: <MusicNote /> },
  { text: 'Albums', href: '/albums', icon: <LibraryMusic /> },
  { text: 'Download', href: '/download', icon: <ArrowCircleDown /> },
]

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Spotify
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ text, href, icon }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ color: router.pathname === href ? '#1976d2' : 'black' }}
              onClick={() => router.push(href)}
            >
              <ListItemText primary={text}/>
              {icon}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Spotify
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ text, href, icon }, index) => (
              <Button
                endIcon={icon}
                key={index}
                sx={{ color: router.pathname === href ? '#fff' : 'black' }}
                onClick={() => router.push(href)}
              >
                {text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}