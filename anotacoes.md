## Wrapper - BrowserRouter

Para o Jest saber que estamos usando Contexto de rotas em nossos testes, precisamos adicionar o BrowserRouter como parâmetro no nosso render.

````js
describe('Rotas', () => {
    test('Deve renderizar a rota principal', () => {
        render(<App/>, {wrapper: BrowserRouter});
        const usuario = screen.getByText('Olá, Joana :)!');
        expect(usuario).toBeInTheDocument();
    })
})
````

wrapper - Seria como dizer que temos um "envelope", o que passamos como valor desse wrapper será o que ficará em volta do nosso componente App.


## Memory router

Permite que testemos a funcionalidade de alguma rota especifica

````js
test('Deve renderizar a rota de Cartões', () => {
        const rota = '/cartoes'
        render(
            <MemoryRouter initialEntries={[rota]}>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='cartoes' element={<Cartoes/>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        const meusCartoes = screen.getByText('Meus cartões')
        expect(meusCartoes).toHaveTextContent('Meus cartões')
})

````