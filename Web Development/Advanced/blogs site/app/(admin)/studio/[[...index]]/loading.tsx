'use client';

import config from '../../../../sanity.config';
import NextStudioLoading from 'next-sanity/studio/loading';

export default function Loading() {
  return <NextStudioLoading config={config} />;
}
