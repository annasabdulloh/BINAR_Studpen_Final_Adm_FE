import React from 'react'
import Login from '../pages/Login'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";


describe('Login', () => {
    test("Menjalankan Login page", async () => {
        render(
            <BrowserRouter>
                <Login></Login>
            </BrowserRouter>
        )
        const items = await screen.findByText('Login Admin')
        expect(items.innerHTML).toEqual('Login Admin')
    })
})