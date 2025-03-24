import { lazy } from 'react';

export const TablePageAsync = lazy(async () => await import('./TablePage.tsx'));
