import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Display from './layouts/Display';
import Error from './pages/Error';
import Home from './pages/Home';
import Unknown from './pages/Unknown';

import './styles/rectify.scss';
import './styles/main.scss';
import './styles/media.scss';
import './styles/tablet.scss';
import './styles/mobile.scss';
import './styles/keyframes.scss';
import './styles/dev.scss';

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Display />} errorElement={<Error />} path="">
        <Route element={<Error />} path="error" />
        <Route element={<Home />} index />
        <Route element={<Unknown />} path="*" />
    </Route>,
));

ReactDOM.createRoot(document.getElementById('main')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
