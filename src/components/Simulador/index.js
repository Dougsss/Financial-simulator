import './style.css';

const Simulador = () => {
    return(
        <div classNome='flex'>
            <h2 classNome='font-bold'>
                Simulador
            </h2>
            <br/>
            <div className='flex flex-row gap-5'>
                <div classNome=''>
                    <form className='flex flex-col'>
                        <div className='flex justify-between flex-grow'>   
                            <p>Rendimento</p>
                            <span>!</span>
                        </div>
                        <div className='flex flex-row border-2 rounded-lg'>
                            <button className='flex flex-auto border-r-2'>Bruto</button>
                            <button className='flex flex-auto border-l-2'>Liquido</button>
                        </div>
                        <label>Aporte Inicial</label>
                        <input type='text' name='aporteInicial' placeholder='' required></input>
                        <label>Prazo (em meses)</label>
                        <input type='text' name='prazo' placeholder='' required></input>
                        <label>IPCA (ao ano)</label>
                        <input type='text' name='IPCA' placeholder=''></input>
                        <button type='submit' className='border-2 border-black border-solid rounded-lg'>Limpar Campos</button>
                    </form>
                </div>
                <div classNome=''>
                    <form className='flex flex-col'>
                        <div className='flex justify-between flex-grow'>   
                            <p>Tipos de indexação</p>
                            <span>!</span>
                        </div>
                        <div className='flex flex-row border-2 rounded-lg'>
                            <button className='flex flex-auto border-r-2'>PRÉ</button>
                            <button className='flex flex-auto border-r-2'>POS</button>
                            <button className='flex flex-auto border-r-2'>FIXADO</button>
                        </div>
                        <label>Aporte Mensal</label>
                        <input type='text' name='aporteInicial' placeholder='' required></input>
                        <label>Rentabilidade</label>
                        <input type='text' name='prazo' placeholder='' required></input>
                        <label>CDI (ao ano)</label>
                        <input type='text' name='IPCA' placeholder=''></input>
                        <button type='submit' className='border-2 border-black border-solid rounded-lg'>Simular</button>
                    </form>
                </div>
                <div className='container md:w-full bg-red-500'>
                    <p/>
                </div>
            </div>
            
        </div>
    )
}

export default Simulador;