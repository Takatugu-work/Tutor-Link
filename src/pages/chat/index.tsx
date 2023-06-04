import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import Layout from 'src/core/layouts/Layout';

export default function ChatPage() {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h5">チャット一覧</Typography>
            <Divider />
          </Box>
          <List>
            <ListItem>
              <ListItemAvatar>
                <AccountCircle sx={{ fontSize: 50 }} />
              </ListItemAvatar>
              <ListItemText
                primary="山田太郎"
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {' 初めまして、佐藤太郎と申します...'}
                  </Fragment>
                }
              />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item>
          <>todo display chat is clicked</>
        </Grid>
      </Grid>
    </Layout>
  );
}
