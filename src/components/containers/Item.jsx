export default function Item({
  children,
  id = 'id_do_item'
}) {
  return (
      <>
        <section id={id} className="item">{children}</section>  
      </>      
  )
}