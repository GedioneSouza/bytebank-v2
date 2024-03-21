import { act, renderHook } from "@testing-library/react"
import { buscaTransacoes } from "../services/transacoes"
import useListaTransacoes from './useListaTransacoes'

jest.mock('../services/transacoes')

const mockTransacao = [{
    id: '1',
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro'
}]


describe('hooks/useListaTransacoes.js', () => {
    test("Deve retornar uma lista de transações e uma função que a atualiza", async () => {
        buscaTransacoes.mockImplementation(() => mockTransacao)

        const { result } = renderHook(() => useListaTransacoes())
        expect(result.current[0]).toEqual([]) // Espero que primeiro seja um array vazio

        await act(async () => {
            result.current[1]() // Função que atualiza a lista de transações
        })

        expect(result.current[0]).toEqual(mockTransacao) // Espero que o valor vindo da api seja igual ao mock
    })
})