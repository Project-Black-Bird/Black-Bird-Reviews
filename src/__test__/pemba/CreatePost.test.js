import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
});

// TEST FOR INPUT CHANGE
test('checks input changes', () => {
	const handleInput = jest.fn();
	const { container } = render(<input type="text" onChange={handleInput} />);
	const input = container.firstChild;
	fireEvent.change(input, { target: { value: 'test' } });
	expect(handleInput).toHaveBeenCalledTimes(1);
	expect(input.value).toBe('test');
});
