export default function Card({children}){
  return(
    <div style={{
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      position: "relative",
      zIndex: 2
    }}>
      {children}
    </div>
  )
}