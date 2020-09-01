import Link from 'next/link'

import styles from 'styles/components/Navbar.module.scss'

const Navbar = () => (
	<nav className={styles.root}>
		<Link href="/">
			<a className={styles.title}>
				do
				<span className={styles.what}>what</span>
			</a>
		</Link>
	</nav>
)

export default Navbar
