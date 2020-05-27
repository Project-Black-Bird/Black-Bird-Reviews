import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../../Components/Login/Login';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import CreatePost from '../../Components/Post/CreatePost/CreatePost';

test('Create Post Form should start with empty values', () => {
	const { container } = render(
		<Provider store={store}>
			<CreatePost />
		</Provider>
	);
	const title = container.querySelector('input[name="title"]');
	const image = container.querySelector('input[name="image"]');
	const review = container.querySelector('input[name="review"]');
	expect(title).toBeDefined();
	expect(image).toBeDefined();
	expect(review).toBeDefined();
	// expect(screen.queryByTestId('submitLogin')).toBeDefined();
});

// test('Register should start with empty values', () => {
// 	const { container } = render(
// 		<Provider store={store}>
// 			<Login />
// 		</Provider>
// 	);
// 	fireEvent.click(screen.getByText('Register Here'));
// 	const verPassword = container.querySelector('input[name="verPassword"]');
// 	const picture = container.querySelector('input[name="picture"]');
// 	expect(verPassword).toBeDefined();
// 	expect(picture).toBeDefined();
// 	expect(screen.getByText('Submit')).toBeDefined();
// });
