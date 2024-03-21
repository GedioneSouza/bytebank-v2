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


## userEvent

Abaixo temos teste de seleção do componente, de digitação no campo e de click no botão

````js
const select = screen.getAllByRole('combobox')
const campoValor = screen.getByPlaceholderText('Digite um valor')
const botao = screen.getByRole('button')

userEvent.selectOptions(select, ['Depósito'])
userEvent.type(campoValor, '100')
userEvent.click(botao)
````


## Testes de integração

Quando falamos em Testes de Integração, devemos ter em mente o objetivo por trás de realizar tal tipo de teste. De forma geral, os testes de integração testam duas ou mais unidades de código para garantir que não exista nenhuma quebra daquilo que já foi testado anteriormente. Devido a isso, é recomendado que os testes de integração sejam feitos após os testes de unidades, para compreender se essas unidades trabalham bem juntas.

Por exemplo, imagine que você trabalha em um site de E-commerce, e precisa testar como a parte da aplicação do cliente (Front-end) se comunica e interage com a parte da aplicação do servidor (Backend). A parte do cliente se comunica de um jeito e a do servidor, um banco de dados por exemplo, se comunica de outra forma totalmente diferente. Então depois de escrever testes para as partes separadas, você poderia criar um teste de integração para verificar como essas duas partes trabalham em conjunto. Em aplicações Front-End, testes de unidade e testes de integração são muito semelhantes, a diferença é que nos testes de integração podemos testar fluxos bem maiores, como páginas, por exemplo.

Observando apenas o lado do Front-end, podemos escrever testes de integração para nossas aplicações, principalmente no React. No React, onde cada componente é uma função, ou seja, uma unidade, podemos escrever testes que avaliem como eles interagem uns com os outros.

Por exemplo, ainda imaginando o site de E-commerce, você poderia testar se ao adicionar um produto a lista de compras, esse produto realmente poderá ser visto e acessado por lá. E se você imaginar que a lista de compras pode ser acessada em uma outra página, por exemplo, você também conseguiria testar a integração entre as rotas de sua aplicação. Pois, ao adicionar um produto a lista de compras espera-se que ele possa ser acessado nesta rota. Mesma coisa você poderia imaginar se fosse o carrinho da seção de finalizar a compra.

Para que você continue estudando e mergulhando mais fundos nos testes, eu vou deixar aqui embaixo um link de um repositório incrível com 50 melhores práticas de testes com JavaScript.

https://github.com/goldbergyoni/javascript-testing-best-practices/blob/master/readme-pt-br.md

- No teste abaixo simulamos o click do botão e se ao clicar renderizou um dos componentes que existe na página que navegamos.
- Usamos o async await na função que roda o test, pois a consulta que está sendo realizada utilizando a query findByText() aguarda o elemento aparecer na tela. Só que ao utilizá-la é preciso tornar o teste assíncrono e aguardar o elemento aparecer no dom. Faz-se isso utilizando o async e o await.


````js
test('Deve navegar até a página correspondente ao link clicado', async () => {
        render(<AppRoutes/>, { wrapper: BrowserRouter })

        const linkPaginaCartoes = screen.getByText('Cartões')
        expect(linkPaginaCartoes).toBeInTheDocument()

        userEvent.click(linkPaginaCartoes)

        const tituloPaginaCartoes = await screen.findByText('Meus cartões')
        expect(tituloPaginaCartoes).toBeInTheDocument()
})
````

## Hooks do Jest

Sabia que o Jest também tem seus próprios hooks? É isso mesmo! Esses hooks, ou ganchos, são funções que executam um trecho de qualquer código em certa etapa do “ciclo de vida” dos testes. Você pode imaginar que um ciclo de vida é basicamente um determinado momento antes ou depois da execução do seu teste.

Esses hooks servem perfeitamente quando precisamos limpar algum dado que tenhamos criado ao iniciar um teste, ou executar alguma tarefa ou configuração repetitiva. Vamos conhecer alguns deles?

beforeAll : Serve para executar algo antes da execução de todos os testes;
beforeEach: Serve para executar algo antes da execução de cada um dos testes iniciar;
afterAll: Serve para executar algo após a finalização de todos os testes;
afterEach: Serve para executar algo após a finalização de cada um dos testes.
Cada um desses hooks deve ser executado recebendo uma função de callback, ou seja:

beforeAll(() => {}); // antes de todos os testes;
beforeEach(() => {}); // antes de cada um dos testes
afterAll(() => {}); // depois de finalizar todos os testes
afterEachAll(() => {}); // depois de finalizar cada um dos testesCOPIAR CÓDIGO
Em nossa aplicação, poderíamos usar o beforeEach para limpar o mock de chamada a api antes de cada teste, dessa forma:

beforeEach(() => {
    api.get.mockClear();
  });

os hooks não podem ser chamados dentro de um test, sempre se lembre de chamá-los fora! 


## Hooks do React`

Render hook é uma função da testing-library que utilizamos para rodar hooks do react nos nossos test, pois ele normalmente reotrnam erros se não são chamados dentro de componentes react. De dentro da função renderHook podemos desestruturar um "result" ele possuí o estado atual ao chamarmos o atributo "current", ficando da maneira abaixo.

````js
test('Hooks', () => {
    const { result } = renderHook(() => {
        const [nome, setNome] = useState('')

        useEffect(() => {
          setNome('Alice')
        }, [])
        
        return nome;
    })

    expect(result.current).toBe('Alice')
})
````



## Podemos utilizar essa função para testar hooks do React

````js
test('hooks/useCounter', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
````