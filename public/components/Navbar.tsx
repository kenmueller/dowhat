import Link from 'next/link'

import ProfileDropdown from './ProfileDropdown'

import styles from 'styles/components/Navbar.module.scss'

const Navbar = () => (
	<nav className={styles.root}>
		<Link href="/">
			<a className={styles.title}>
				do
				<span className={styles.what}>what</span>
			</a>
		</Link>
		<ProfileDropdown />
	</nav>
)

export default Navbar
