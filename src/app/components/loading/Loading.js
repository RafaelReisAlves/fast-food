import styles from "./loading.module.css"

export default function Loading({loading, children}) {
  return(
    loading ? (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}></div>
      </div>
    ) : (
      children
    )
    
  )
}