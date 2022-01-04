// desestruturamos as props de children para usá-las no conteúdo do componente
// children é todo o conteúdo filho dentro de Header
export default function Header({children}){

  let fontSize = 'text-xl'
  if (fontSize === 'large') {
    fontSize = 'text-2xl'
  }

  return (
    <header>
      <div className="bg-black mx-auto p-4 border-b-4 border-red-600">
        <h1 className={`text-center text-white font-semibold ${fontSize}`}>{children}</h1>
      </div>
    </header>
  )
}