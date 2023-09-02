import dynamic from 'next/dynamic'

export const Loader = dynamic(() => import('./Loader'), {ssr: false});
export const Timer = dynamic(() => import('./Timer'));