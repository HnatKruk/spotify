import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { wrapper } from '../store';
import MainLayout from '../layouts/MainLayout';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const isOnTracksPage = router.pathname === '/';

  return (
    <Provider store={store}>
      {isOnTracksPage ? (
        <Component {...props.pageProps} />
      ) : (
        <MainLayout>
          <Component {...props.pageProps} />
        </MainLayout>
      )}
    </Provider>
  );
};

export default MyApp;
