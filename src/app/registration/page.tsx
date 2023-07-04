import dynamic from 'next/dynamic';

const NoSSRPage = dynamic(() => import('./logic'), {
  ssr: false,
});

export default () => {
  return <NoSSRPage />;
};
