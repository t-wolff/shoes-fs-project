import React, { createContext, useState, useEffect, useCallback } from 'react';

import { shoeAPI } from '../api';

export const ShoeContext = createContext();

export const ShoeProvider = ({ children }) => {
	const [shoes, setShoes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchShoes = async () => {
		setIsLoading(true);
		try {
			const response = await shoeAPI.getAllShoes();
			setShoes(response.data.data);
		} catch (err) {
			console.error((err.response?.data?.error || 'An error occurred', 'error'));
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchShoes();
	}, []);

	const handleShoeAction = async (action, shoe, id = null) => {
		setIsLoading(true);
		try {
			let response = null;
			if (!shoe) {
				await action(id);
			} else if (id) {
				response = await action(shoe, id);
			} else {
				response = await action(shoe);
			}
			fetchShoes();
		} catch (err) {
			console.error((err.response?.data?.error || 'An error occurred', 'error'));
		} finally {
			setIsLoading(false);
		}
	};

	// const addNewShoe = (shoe) => handleShoeAction(shoeAPI.addShoe, 'add', shoe);
	// const editShoe = (shoeData) =>
	// 	handleShoeAction(shoeAPI.updateShoe, 'update', shoeData, shoeData.id);
	// const removeShoe = (id) => handleShoeAction(() => shoeAPI.deleteShoe(id), 'delete', null, id);

	const addNewShoe = (shoe) => handleShoeAction(() => shoeAPI.addShoe(shoe), 'add');
	const editShoe = (shoeData) =>
		handleShoeAction(() => shoeAPI.updateShoe(shoeData, shoeData._id), 'update');
	const removeShoe = (id) => handleShoeAction(() => shoeAPI.deleteShoe(id), 'delete', null, id);

	return (
		<ShoeContext.Provider
			value={{
				shoes,
				isLoading,
				addNewShoe,
				editShoe,
				removeShoe,
			}}>
			{children}
		</ShoeContext.Provider>
	);
};
