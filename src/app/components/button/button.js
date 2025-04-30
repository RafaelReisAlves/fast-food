import styles from "./button.module.css"

export default function Button({ disabled, text, onClick }) {
    return (
        <button
            className={styles.button}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    )
}