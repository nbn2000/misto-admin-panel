/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import Router from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import 'src/global.css';
import ThemeProvider from 'src/theme';
import { SnackbarCloseButton } from './utils/SnackbarCloseButton';

import store from './store';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <Provider store={store}>
      <SnackbarProvider
        autoHideDuration={3000}
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      >
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  );
}
