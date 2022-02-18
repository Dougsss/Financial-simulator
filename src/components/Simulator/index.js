import "./style.css";
import 'boxicons'
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useState } from "react"

export default function Simulator({ indicators }) {
  //Este Bloco inicia o formulario com os valores padrões. Definimos o valor "1" ao Prazo pois entendo que não pode ser menor que um mês
  //Também foi definido os nomes das variáveis em inglês, pois é o padrão para programação.
  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      deadLine: 1,
      initialValue: 0,
      monthlyValue: 0,
      profitability: null,
      ipca: 0,
      cdi: 0,
    }
  });
  //Este Bloco cria os estados do tipo rendimento, tipoindexação  e resultados da API
  const [incomeType, setIncomeType] = useState('bruto')
  const [indexType, setIndexType] = useState('pos')
  const [result, setResult] = useState(null)
  //Este bloco chama a API enviando o rendimento e indexação
  const onSubmit = data => {
    fetch(`http://localhost:3000/simulacoes?tipoIndexacao=${indexType}&tipoRendimento=${incomeType}`)
      .then(response => response.json())
      .then(data => {
        setResult(data[0])
      })
  };
  //Este bloco reseta os resultados e formularios 
  //Também foi definido os nomes das variáveis em inglês, pois é o padrão para programação.
  const cleanFields = () => {
    reset({
      deadLine: 1,
      initialValue: 0,
      monthlyValue: 0,
      profitability: null,
      incomeType: 'bruto',
      indexType: 'pos'
    })
    setResult(null)
  }
  //Este bloco popula cdi e ipca com valores que veio da chamada da API
  indicators.forEach(i => {
    if (i.nome === 'cdi') {
      setValue('cdi', i.valor)
    } else if (i.nome === 'ipca') {
      setValue('ipca', i.valor)
    }
  })
  return (
    <div className="flex flex-col mt-8 lg:flex-row">
      <form className="flex flex-col w-full lg:w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-5 text-xl text-center lg:text-left font-bold">Simulador</h2>
        <div className="flex flex-col sm:flex-row gap-x-12 lg:gap-12">
          <div className="flex flex-col w-full md:w-2/5 gap-">
            <div className="flex justify-between flex-grow mb-3 font-extralight">
              <p>Rendimento</p>
              <box-icon name='info-circle'></box-icon>
            </div>
            {/* Este bloco contém buttons que irão selecionar os estados para os cálculos */}
            <div className="flex flex-row mx-1 mb-6 border-2 border-black rounded-lg">
              <button type="button" className={`flex flex-auto h-12 p-2 ${incomeType === 'bruto' ? 'bg-orange-500 text-white rounded-lg border-r-2 border-black' : ''}`} onClick={() => { setIncomeType('bruto') }}>Bruto</button>
              <button type="button" className={`flex flex-auto h-12 p-2 ${incomeType === 'liquido' ? 'bg-orange-500 text-white rounded-lg border-l-2 border-black' : ''}`} onClick={() => { setIncomeType('liquido') }}>Líquido</button>
            </div>
            <label className="mb-2 font-extralight">Aporte Inicial</label>
            {/* Adicionei um controlador para "controlar" as regras e o que vai ser renderizado */}
            <Controller
              control={control}
              name="initialValue"
              rules={{ required: true }}
              render={({ field: { onChange, value, name } }) => (
                /* Este bloco formata as definições do valor para servir de parametro para o controlador */
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"R$ "}
                  fixedDecimalScale={true}
                  value={value}
                  name={name}
                  decimalScale={2}
                  onValueChange={v => { onChange(Number(v.value)) }} />
              )} />
            {/* Este bloco contem as  regras aplicadas aos erros dos campos */}
            {errors.initialValue && <span className="text-red-500">Este compo é obrigatorio</span>}
            <label className="mt-5 mb-2 font-extralight">Prazo (em meses)</label>
            <input className="border-b-2 bg-gray-100 h-10 border-gray-400 appearance-none" autoComplete="off" type="text" {...register("deadLine", { required: true, min: 1 })} />
            {errors.deadLine?.type === 'required' && <span className="text-red-500">Este compo é obrigatorio</span>}
            {errors.deadLine?.type === 'min' && <span className="text-red-500">Prazo tem que ser maior que 0</span>}
            <label className="mt-5 mb-2 font-extralight">IPCA (ao ano)</label>
            <input className="mb-8 border-b-2 h-10 border-gray-400 appearance-none" autoComplete="off" type="text" {...register("ipca", { disabled: true })} />
            {/* Botão contendo a função de limpar os campos com dados */}
            <button onClick={cleanFields} type="button" className="font-bold border-2 border-black border-solid rounded-lg h-11">Limpar Campos</button>
          </div>
          <div className="flex flex-col w-full md:w-2/5">
            <div className="flex justify-between mt-10 sm:mt-0 flex-grow mb-3 font-extralight">
              <p>Tipos de indexação</p>
              <box-icon name='info-circle'></box-icon>
            </div>
            {/* Este bloco contém buttons que irão selecionar os estados para os cálculos */}
            <div className="flex flex-row mx-1 mb-6 border-2 border-black rounded-lg">
              <button type="button" className={`flex flex-auto h-12 p-2 ${indexType === 'pre' ? 'bg-orange-500 text-white rounded-lg border-r-2 border-black' : ''}`} onClick={() => setIndexType('pre')}>PRÉ</button>
              <button type="button" className={`flex flex-auto h-12 p-2 ${indexType === 'pos' ? 'bg-orange-500 text-white rounded-lg border-x-2 border-black' : ''}`} onClick={() => setIndexType('pos')}>POS</button>
              <button type="button" className={`flex flex-auto h-12 p-2 ${indexType === 'ipca' ? 'bg-orange-500 text-white rounded-lg border-l-2 border-black' : ''}`} onClick={() => setIndexType('ipca')}>FIXADO</button>
            </div>
            <label className="mb-2 font-extralight">Aporte Mensal</label>
            {/* Adicionei um controlador para "controlar" as regras e o que vai ser renderizado */}
            <Controller
              control={control}
              name="monthlyValue"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                /* Este bloco formata as definições do valor para servir de parametro para o controlador */
                <NumberFormat
                  thousandSeparator={true}
                  prefix={"R$ "}
                  fixedDecimalScale={true}
                  value={value}
                  decimalScale={2}
                  onValueChange={v => { onChange(Number(v.value)) }} />
              )} />
            {/* Este bloco contem as  regras aplicadas aos erros dos campos */}
            {errors.monthlyValue && <span className="text-red-500">Este compo é obrigatorio</span>}
            <label className="mt-5 mb-2 font-extralight">Rentabilidade (%)</label>
            <input className="border-b-2 h-10 bg-gray-100 border-gray-400 appearance-none" autoComplete="off" type="number" {...register("profitability", { required: true, min: 0 })} />
            {errors.profitability && <span className="text-red-500">Este compo é obrigatorio</span>}
            <label className="mt-5 mb-2 font-extralight">CDI (ao ano)</label>
            <input className="mb-8 h-10 border-b-2 border-gray-400 appearance-none" autoComplete="off" type="text" {...register("cdi", { disabled: true })} />
            <button type="submit" className="font-bold bg-gray-300 border-2 border-black border-solid rounded-lg hover:text-white hover:bg-orange-500 h-11">
              Simular
            </button>
          </div>
        </div>
      </form>
      {/* Este bloco exibe os resultados dos valores com os parametros fornecidos pela API */}
      <div className="flex flex-col w-full lg:w-1/2">
        <h2 className="mb-5 mt-12 lg:mt-0 text-xl text-center lg:text-left font-bold">Resultado da Simulação</h2>
        <div className="flex flex-col mt-4 md:flex-row gap-x-5">
          <div className="divResult">
            <div className="boxResult">Valor Final Bruto
              <p className="valueResult">{result?.valorFinalBruto}</p></div>
            <div className="boxResult">Valor Final Líquido
              <p className="valueResult text-green-600">{result?.valorFinalLiquido}</p></div>
          </div>
          <div className="divResult">
            <div className="boxResult">Alíquota do IR
              <p className="valueResult">{result?.aliquotaIR}</p></div>
            <div className="boxResult">Valor Total Investido
              <p className="valueResult">{result?.valorTotalInvestido}</p></div>
          </div>
          <div className="divResult">
            <div className="boxResult">Valor Pago em IR
              <p className="valueResult">{result?.valorPagoIR}</p></div>
            <div className="boxResult">Ganho Líquido
              <p className="valueResult text-green-600">{result?.ganhoLiquido}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Simulator };
