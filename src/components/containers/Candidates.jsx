export default function Candidates({ presence, children: candidates }) {

  return (
    <>

      <h3 id='candiates_length' className="mt-4 text-center font-semibold">
        {candidates.length} candidatos
      </h3>

      <div id='candidate_render' className='flex flex-wrap p-2 justify-center'>
        
        {candidates.map((candidate, index) => {
          const nsmeFirsLetter = candidate.name[0].toLowerCase()
          const nameWithoutFirstLetter = candidate.name.slice(1)
          const { votes } = candidate
          const percent = (votes / presence) * 100
          const elected = index === 0 ? <span className='bg-green-200 p-1'>Eleito</span> : <span className='bg-red-200 p-1'> Não eleito</span>;

          return (

            <li
              className="p-2 pb-4 m-2 border flex flex-col items-center justify-center bg-white"
              key={candidate.id}
            >
              <div className="flex flex-row items-center justify-between space-x-4">
                
                <img
                  src={`./img/${nsmeFirsLetter}${nameWithoutFirstLetter}.png`}
                  alt={candidate.name}
                  width="50"
                  className="rounded-full"
                />

                <div className="flex flex-col items-center">
                  <div><strong><small>{percent.toFixed(2)} %</small></strong></div>
                  <div><strong>{votes}</strong> votos</div>
                </div>

              </div>

              <div><strong>{candidate.name}</strong></div>
              <div><small>{elected}</small></div>
            </li>

          )
        })}

      </div>

    </>
  )

}
