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

"O <MemoryRouter/> é um dos recursos mais importantes do react router-dom para quem deseja testar as rotas de uma aplicação. Ele dá um controle muito grande sobre as rotas, pelo fato de não estar vinculado a pilha de histórico de navegação como o <BrowserRouter/>, dando mais liberdade para acessar o local que desejar.

Mas Exemplos https://github.com/remix-run/react-router/tree/main/packages/react-router/__tests__."

Testes para o React Router v5 (Versão mais antiga) era necessário instalar uma biblioteca chamada history para permitir gerenciar com mais facilidade o histórico da aplicação.

Se ficou curioso e quiser saber mais sobre como os dev’s ancestrais faziam, vou deixar o link de um exemplo muito interessante de como os testes eram feitos para essa versão logo abaixo:

https://testing-library.com/docs/example-react-router/#testing-library-and-react-router-v5

E para saber mais sobre o history, vale a pena acessar a documentação neste link https://github.com/remix-run/history#documentation.

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