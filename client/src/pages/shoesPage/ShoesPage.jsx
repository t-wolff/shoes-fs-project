import { ShoeItem } from '../../components';
import './shoesPage.css';
import { useGlobalShoeContext } from '../../hooks/useGlobalShoeContext';
// const URL = "https://650ae867dfd73d1fab092778.mockapi.io/shoes/shoe"

function ShoesPage() {
	const { shoes, isLoading } = useGlobalShoeContext();

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="main-page">
			<div className="shoes-container">
				{shoes.map((shoe) => {
					return <ShoeItem key={shoe._id} {...shoe} />;
				})}
			</div>
		</div>
	);
}

export default ShoesPage;
