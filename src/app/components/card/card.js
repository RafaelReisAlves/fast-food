export default function Card({children}){
  return(
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
    }}>
      {children}
    </div>
  )
}