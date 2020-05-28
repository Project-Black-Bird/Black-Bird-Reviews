import React from 'react';
import {render} from '@testing-library/react';
import Profile from "../../Components/Profile/Profile";
import {Provider} from "react-redux";
import store from "../../redux/store";


test('Profile should show username', () => {
   const {container} = render(
       <Provider store={store}>
           <Profile/>
       </Provider>
   )
   const username = container.querySelector('input[name="username"]');
   expect(username).toBeDefined();
});

test('Profile should show image', () => {
    const {container} = render(
        <Provider store={store}>
            <Profile/>
        </Provider>
    )
    const image = container.querySelector('input[name="image"]');
    expect(image).toBeDefined();
 });

 test('Profile should show email', () => {
    const {container} = render(
        <Provider store={store}>
            <Profile/>
        </Provider>
    )
    const email = container.querySelector('input[name="email"]');
    expect(email).toBeDefined();
 });

 test('Profile should edit', () => {
    const {container} = render(
        <Provider store={store}>
            <Profile/>
        </Provider>
    )
    const handleEditView = container.querySelector('input[name="email"]');
    expect(handleEditView).toBeDefined();
 });

 test('Profile should log out', () => {
    const {container} = render(
        <Provider store={store}>
            <Profile/>
        </Provider>
    )
    const handleLogout = container.querySelector('input[name="email"]');
    expect(handleLogout).toBeDefined();
 });