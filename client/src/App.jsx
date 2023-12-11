import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';

import { SharedLayout } from './components';
import { AddShoePage, ShoesPage, NotFound} from './pages';
import './App.css';

const routes = [
	{
		path: '/',
		element: <SharedLayout />,
		children: [
			{ index: true, element: <ShoesPage /> },
			{
				path: 'add',
				element: <AddShoePage />,
			},
			{ path: '*', element: <NotFound /> },
		],
	},
	
];

function App() {
  const router = createBrowserRouter(routes);
	return (
		<RouterProvider router={router}/>
	);
}

export default App;
