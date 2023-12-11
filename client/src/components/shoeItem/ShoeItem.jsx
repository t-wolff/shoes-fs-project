import { useState } from 'react';
import { useGlobalShoeContext } from '../../hooks/useGlobalShoeContext';
import './shoeItem.css';

function ShoeItem({ _id, name, image }) {
	const { removeShoe, editShoe } = useGlobalShoeContext();

	const [isEdit, setIsEdit] = useState(false);
	const [newName, setNewName] = useState('');

	const handleInputChange = (event) => {
		setNewName(event.target.value);
	};

	const toggleEdit = () => {
		setIsEdit(!isEdit);
	};

	const handleDelete = (id) => {
		removeShoe(id);
	};

	const handleEdit = (event) => {
		event.preventDefault();
		editShoe({
			name: newName,
			_id: _id
		});
	};

	return (
		<div className="shoe-item" id={_id}>
			<div className="buttons-container">
				<button className="delete-btn btn" name="delete-btn" onClick={() => handleDelete(_id)}>
					Delete
				</button>
				<button className="edit-btn btn" name="edit-btn" onClick={toggleEdit}>
					Edit
				</button>
			</div>
			<img src={image} alt={name} />
			<h2>
				{isEdit ? (
					<form className="input-container" onSubmit={handleEdit}>
						<input
							className="input-name"
							type="text"
							value={newName}
							onChange={handleInputChange}
						/>
						<input className="input-btn btn" type="submit" value="Save" />
					</form>
				) : (
					name
				)}
			</h2>
		</div>
	);
}

export default ShoeItem;
