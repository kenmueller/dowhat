import { useState, useCallback, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import GoogleSignInForm from './GoogleSignInForm'

import styles from 'styles/components/ProfileDropdown.module.scss'

const ProfileDropdown = () => {
	const contentRef = useRef<HTMLDivElement | null>(null)
	const [isShowing, setIsShowing] = useState(false)
	
	const show = useCallback(() => {
		setIsShowing(true)
	}, [setIsShowing])
	
	const onBodyClick = useCallback((event: MouseEvent) => {
		const content = contentRef.current
		const { target } = event
		
		if (content && !(content === target || content.contains(target as Node)))
			setIsShowing(false)
	}, [contentRef, setIsShowing])
	
	useEffect(() => {
		if (!isShowing)
			return
		
		const { body } = document
		
		body.addEventListener('click', onBodyClick)
		
		return () => body.removeEventListener('click', onBodyClick)
	}, [isShowing, onBodyClick])
	
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
			<div
				ref={contentRef}
				className={cx(styles.content, {
					[styles.showing]: isShowing
				})}
			>
				<GoogleSignInForm isFocused={isShowing} />
			</div>
		</div>
	)
}

export default ProfileDropdown
