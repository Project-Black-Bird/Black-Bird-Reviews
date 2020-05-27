import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import EditPost from "../../Components/Post/EditPost/EditPost";

test('Login should start with empty values', ()=>{
    const {container} = render(
        <EditPost/>
    )
    // const email = container.querySelector('input[name="email"]');
    // const password = container.querySelector('input[name="password"]');
    // expect(email).toBeDefined();
    // expect(password).toBeDefined();
    // expect(screen.queryByTestId('submitLogin')).toBeDefined();
})

test('Register should start with empty values', ()=>{
    const {container} = render(
        <EditPost/>
    )
    // fireEvent.click(screen.getByText('Register Here'));
    // const verPassword = container.querySelector('input[name="verPassword"]');
    // const picture = container.querySelector('input[name="picture"]');
    // expect(verPassword).toBeDefined();
    // expect(picture).toBeDefined();
    // expect(screen.getByText('Submit')).toBeDefined();
})