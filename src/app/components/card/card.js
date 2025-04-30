export default function Card({ children, style, className }) {
    return (
        <div
            className={className}
            style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                ...style,
            }}
        >
            {children}
        </div>
    )
}