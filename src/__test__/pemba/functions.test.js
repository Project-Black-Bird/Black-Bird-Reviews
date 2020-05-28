import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Posts from './../../Components/Posts/Posts';
import CommentForm from '../../Components/Comment/CommentForm';

const { handleSubmit } = require('../../Components/Comment/CommentForm');

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider store={store}>
			<Posts></Posts>
		</Provider>,
		div
	);
});

test('expect true to be truthy', () => {
	expect(true).toBeTruthy();
});

test('expect false to be falsy', () => {
	expect(false).not.toBeTruthy();
});

test('CommentForm should start with empty values', () => {
	const { container } = render(
		<Provider store={store}>
			<CommentForm />
		</Provider>
	);
	const comment = container.querySelector('input[name="comment"]');
	expect(comment).toBeDefined();
});
