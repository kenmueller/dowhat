import { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import cx from 'classnames'

import styles from 'styles/components/ProfileDropdown.module.scss'

const ProfileDropdown = () => {
	const [isShowing, setIsShowing] = useState(false)
	
	const show = useCallback(() => {
		setIsShowing(true)
	}, [setIsShowing])
	
	return (
		<div className={styles.root}>
			<button className={styles.trigger} onClick={show}>
				<p className={styles.name}>
					Anonymous
				</p>
				<FontAwesomeIcon
					className={styles.icon}
					icon={faChevronCircleDown}
				/>
			</button>
			<div className={cx(styles.content, {
				[styles.showing]: isShowing
			})}>
				Hello
				{/* <FontAwesomeIcon icon={faGoogle} /> */}
			</div>
		</div>
	)
}

export default ProfileDropdown
