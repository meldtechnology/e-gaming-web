import React from 'react';
import Box from '@mui/material/Box';

import Main from '../../../../mui/layouts/Main';
import Container from '../../../../mui/components/Container';
import { Form } from './components';

export const Verification = () => {
  return (
    <Main>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Container
          paddingX={0}
          paddingY={0}
          maxWidth={{ sm: 1, md: 1236 }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            className="rounded-2xl border border-border bg-surface shadow-e1"
            sx={{
              minHeight: 'calc(100vh - 58px)',
              overflow: 'hidden',
            }}
          >
            {/* Form Section */}
            <Box
              width={1}
              order={{ xs: 2, md: 1 }}
              display="flex"
              alignItems="center"
              className="min-h-[680px] bg-surface"
            >
              <Container>
                <Form />
              </Container>
            </Box>

            {/* Image Section */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                flex: '0 0 50%',
                maxWidth: '50%',
                position: 'relative',
                minHeight: 'calc(100vh - 58px)',
                overflow: 'hidden',
                order: 2,
              }}
            >
              <Box
                component="img"
                src="https://assets.maccarianagency.com/backgrounds/img18.jpg"
                alt="Authentication background"
                loading="lazy"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center right',
                  filter: 'brightness(0.92)',
                  clipPath:
                    'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
}
