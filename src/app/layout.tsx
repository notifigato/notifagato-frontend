'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  GlobalStyles,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
} from 'shared/components';
import { HowToRegOutlined, SendOutlined } from 'shared/icons';
import { Theme } from 'app/theme';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const changePage = (newRoute: string) => {
    router.push(newRoute);
  };
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <GlobalStyles
            styles={{
              body: {
                padding: 0,
                margin: 0,
                fontFamily: 'Roboto, monospace',
                minWidth: '100vw',
                minHeight: '100vh',
                backgroundColor: Theme.palette.background.default,
                color: Theme.palette.text.primary,
              },
            }}
          />
          <body className={inter.className}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper
                square
                elevation={0}
                sx={{
                  p: 3,
                  mt: 8,
                  background: 'transparent',
                  width: 400,
                }}
              >
                <Tabs
                  value={pathname}
                  aria-label="basic tabs example"
                  sx={{ marginBottom: '26px' }}
                >
                  <Tab
                    label="Send message"
                    icon={<SendOutlined />}
                    onClick={() => changePage('/sendMessage')}
                    value="/sendMessage"
                    sx={{ width: '50%' }}
                  />
                  <Tab
                    label="Registration"
                    icon={<HowToRegOutlined />}
                    onClick={() => changePage('/registration')}
                    value="/registration"
                    sx={{ width: '50%' }}
                  />
                </Tabs>
                <div suppressHydrationWarning={true}>{children}</div>
              </Paper>
            </Box>
          </body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}
