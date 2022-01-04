export default function Main({children}){
  return (
    // passamos o conteúdo (html) como children para a função do componente 
    <main className="container mx-auto p-4">
      {children}
    </main>
  ) 
}
