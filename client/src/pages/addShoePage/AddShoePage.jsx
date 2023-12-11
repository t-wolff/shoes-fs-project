import { useState } from 'react';
import './addShoePage.css';
import { useGlobalShoeContext } from '../../hooks/useGlobalShoeContext';
import { useNavigate } from 'react-router-dom';


function AddShoePage() {
	const { addNewShoe } = useGlobalShoeContext();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: '',
		image: '',
	});

	const handleInputChange = (event) => {
		const type = event.target.name;
		setFormData(() => {
			return { ...formData, [type]: event.target.value };
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		let isValid = true;
		if (formData.name.length < 0 || formData.image.length < 0) {
			isValid = false;
		}

		if (isValid) {
			addNewShoe({
				name: formData.name,
				image: formData.image,
			});
			navigate('/');
		}

		setFormData(() => {
			return { name: '', image: '' };
		});
	};

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name of New Shoe</label>
				<input type="text" name="name" value={formData.name} onChange={handleInputChange} />
				<label htmlFor="image">Address for Shoe PNG</label>
				<input type="text" name="image" value={formData.image} onChange={handleInputChange} />
				<input className="submit-btn" type="submit" value="Submit New Shoe" />
			</form>
		</div>
	);
}

export default AddShoePage;
