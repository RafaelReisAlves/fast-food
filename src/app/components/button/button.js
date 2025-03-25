import styles from "./button.module.css"

export default function Button({disabled, text}){
  return(
    <div className={styles.button}>
      <button disabled={disabled}>{text}</button>
    </div>
  )
}