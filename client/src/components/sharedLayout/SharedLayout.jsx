import { Outlet, NavLink } from 'react-router-dom';
import './sharedLayout.css'

const SharedLayout = () => {
	return (
		<div className="main-container">
			<header>
				<h1>OODLES OF SHOES</h1>
			</header>
			<nav>
				<ul className="">
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/add">Add New Item</NavLink>
					</li>
				</ul>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default SharedLayout;
