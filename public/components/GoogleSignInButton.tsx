import { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import styles from 'styles/components/GoogleSignInButton.module.scss'

const GoogleSignInButton = () => {
	const signIn = useCallback(() => {
		
	}, [])
	
	return (
		<button className={styles.root} onClick={signIn}>
			<FontAwesomeIcon
				className={styles.icon}
				icon={faGoogle}
			/>
			<p className={styles.message}>
				Sign in with Google
			</p>
		</button>
	)
}

export default GoogleSignInButton
