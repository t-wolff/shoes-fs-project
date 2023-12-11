
import { NavLink } from 'react-router-dom';

function NotFound() {
    return (
			<div className="not-found">
				<h2>Page Not Found</h2>
				<NavLink to="/">
					Return Home
				</NavLink>
			</div>
		);
}
export default NotFound;