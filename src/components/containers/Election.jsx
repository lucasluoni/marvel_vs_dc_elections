export default function Election({children: city}) {

  // desestrutura as propriedades de children (selectedCity)
  const {name, votingPopulation, presence, absence} = city

  return (
    <>
      <div className='mt-4 border p-2'>
        <h2 className='font-semibold text-center text-lg mb-4'>
          Eleição em {name}
        </h2>

        <ul className='flex flex-row justify-center space-x-4 flex-wrap'>
          <li>
            <strong>Total de eleitores: </strong>
            <span>{votingPopulation}</span>
          </li>
          <li>
            <strong>Abstenção: </strong>
            <span>{absence}</span>
          </li>
          <li>
            <strong>Comparecimento: </strong>
            <span>{presence}</span>
          </li>
        </ul>

      </div>
    </>
  )
}
