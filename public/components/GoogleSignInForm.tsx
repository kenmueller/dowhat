import { useState, useCallback, FormEvent, ChangeEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'

import firebase from 'lib/firebase'
import Spinner from './Spinner'

import styles from 'styles/components/GoogleSignInForm.module.scss'

import 'firebase/auth'
import 'firebase/firestore'

const auth = firebase.auth()
const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/userinfo.email')

const GoogleSignInButton = ({ isFocused }: { isFocused: boolean }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isNameValidationLoading, setIsNameValidationLoading] = useState(false)
	
	const [name, setName] = useState('')
	const [isNameValid, setIsNameValid] = useState(false)
	
	const authenticate = useCallback(async (newUser: boolean) => {
		try {
			const {
				user,
				additionalUserInfo
			} = await auth.signInWithPopup(provider)
			
			if (!(user && additionalUserInfo))
				throw new Error('An unknown error occurred. Please try again')
			
			if (!user.email)
				throw new Error('Unable to get your email address')
			
			if (additionalUserInfo.isNewUser && !newUser) {
				toast.error('You don\'t have an account yet. Sign up instead.')
				return
			}
			
			if (!additionalUserInfo.isNewUser)
				return
			
			setIsLoading(true)
			
			await Promise.all([
				user.updateProfile({ displayName: name }),
				firestore.doc(`users/${user.uid}`).set({
					name,
					email: user.email,
					joined: firebase.firestore.FieldValue.serverTimestamp()
				})
			])
			
			setIsLoading(false)
		} catch ({ code, message }) {
			if (code !== 'auth/popup-closed-by-user')
				toast.error(message)
		}
	}, [name, setIsLoading])
	
	const signUp = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		authenticate(true)
	}, [authenticate])
	
	const signIn = useCallback(() => {
		authenticate(false)
	}, [authenticate])
	
	const onNameInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}, [setName])
	
	// Validate name
	useEffect(() => {
		if (!name)
			return setIsNameValid(false)
		
		let shouldContinue = true
		
		setIsNameValidationLoading(true)
		
		firestore
			.collection('users')
			.where('name', '==', name)
			.limit(1)
			.get()
			.then(({ empty }) => {
				if (!shouldContinue)
					return
				
				setIsNameValid(empty)
				setIsNameValidationLoading(false)
			})
			.catch(error => {
				if (!shouldContinue)
					return
				
				setIsNameValid(false)
				setIsNameValidationLoading(false)
				
				toast.error(error.message)
			})
		
		return () => { shouldContinue = false }
	}, [name])
	
	const onNameInputRef = useCallback((input: HTMLInputElement | null) => {
		input?.[isFocused ? 'focus' : 'blur']()
	}, [isFocused])
	
	return (
		<form onSubmit={signUp}>
			<label className={styles.nameLabel}>
				{name
					? isNameValidationLoading
						? (
							<>
								<Spinner className={styles.nameLabelSpinner} />
								Checking availability...
							</>
						)
						: (
							<>
								<FontAwesomeIcon
									className={cx(
										styles.nameLabelIcon,
										styles[isNameValid ? 'validName' : 'invalidName']
									)}
									icon={isNameValid ? faCheckCircle : faTimesCircle}
								/>
								{isNameValid ? 'Available' : 'Taken'}
							</>
						)
					: 'Must be unique'
				}
			</label>
			<input
				ref={onNameInputRef}
				className={styles.nameInput}
				placeholder="Username"
				value={name}
				onChange={onNameInputChange}
			/>
			<button
				className={cx(styles.button, { [styles.loading]: isLoading })}
				disabled={isLoading || isNameValidationLoading || !isNameValid}
			>
				Sign up
			</button>
			<div className={styles.divider}>
				<span className={styles.dividerBar} />
				<span className={styles.dividerMessage}>or</span>
				<span className={styles.dividerBar} />
			</div>
			<button
				className={cx(styles.button, { [styles.loading]: isLoading })}
				type="button"
				disabled={isLoading}
				onClick={signIn}
			>
				Sign in
			</button>
		</form>
	)
}

export default GoogleSignInButton
